/** Google 地圖評論（Places API New）→ /reviews「客戶評價」頁
 *
 *  - env `GOOGLE_PLACES_API_KEY`（server-only，**不要**加 NEXT_PUBLIC_ 前綴，不然 key 會進前端 bundle）
 *  - 多個 Google 商家合併成「一個總評分」：老闆不要評論分店（2026-10-02），頁面不標示評論來自哪間店
 *  - Google 限制：每個商家只回最多 5 則「最相關」評論；但 rating / userRatingCount 是完整的 → 總評分照實
 *  - 只放 4~5 星當「精選」，但總評分包含全部評論，頁面上要寫清楚（避免被說挑評論誤導）
 *  - 條款：評論要顯示作者名＋連結、標示來源 Google 地圖；不可長期儲存評論內容 → 只用 fetch 快取 1 天
 *  - placeId 用 `node scripts/resolve-places.mjs` 查出來後填進下面；Place ID 依條款可永久保存
 */

export type ReviewPlace = {
  /** 內部辨識用，頁面不顯示 */
  label: string;
  /** resolve-places 腳本用的搜尋字 */
  query: string;
  placeId?: string;
  /** 「到 Google 地圖看更多評論」連到這間（搜「統包先生」時出現的主卡片） */
  primary?: boolean;
};

export const REVIEW_PLACES: ReviewPlace[] = [
  { label: '五股創始店', query: '統包先生室內裝修有限公司', primary: true },
  { label: '板橋店', query: '統包先生室內裝修板橋店' },
  { label: '龜山店', query: '統包先生室內裝修股份有限公司 龜山店' },
  { label: '烏日店', query: '統包先生 台中' },
  { label: '慈文店', query: '桃區統包先生室內裝修有限公司' },
];

export type GoogleReview = {
  id: string;
  rating: number;
  text: string;
  author: string;
  authorUrl: string | null;
  authorPhoto: string | null;
  relativeTime: string;
  publishTime: string;
};

export type ReviewSummary = {
  /** 合併總評分（以各店評論數加權），一位小數 */
  rating: number;
  /** 合併總評論數 */
  count: number;
  /** 主商家的 Google 地圖連結 */
  mapsUrl: string | null;
  /** 精選（4~5 星、有文字），新到舊 */
  featured: GoogleReview[];
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name: string;
    rating: number;
    text?: { text: string };
    originalText?: { text: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
};

const FIELDS = 'rating,userRatingCount,googleMapsUri,reviews';
const ONE_DAY = 86400;

async function fetchPlace(placeId: string, key: string): Promise<PlaceResponse | null> {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=zh-TW`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELDS },
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) {
      console.error(`[reviews] Places API ${res.status} for ${placeId}:`, (await res.text()).slice(0, 300));
      return null;
    }
    return (await res.json()) as PlaceResponse;
  } catch (e) {
    console.error('[reviews] Places API 失敗：', e);
    return null;
  }
}

/** 合併多個商家：總評分以評論數加權。純函式，方便測試 */
export function combine(places: Array<{ primary?: boolean; data: PlaceResponse | null }>): ReviewSummary | null {
  const ok = places.filter((p) => p.data && p.data.userRatingCount);
  if (ok.length === 0) return null;

  let count = 0;
  let weighted = 0;
  for (const p of ok) {
    const n = p.data!.userRatingCount || 0;
    count += n;
    weighted += (p.data!.rating || 0) * n;
  }

  const seen = new Set<string>();
  const featured: GoogleReview[] = [];
  for (const p of ok) {
    for (const r of p.data!.reviews || []) {
      const text = (r.originalText?.text || r.text?.text || '').trim();
      if (r.rating < 4 || !text || seen.has(r.name)) continue;
      seen.add(r.name);
      featured.push({
        id: r.name,
        rating: r.rating,
        text,
        author: r.authorAttribution?.displayName || 'Google 使用者',
        authorUrl: r.authorAttribution?.uri || null,
        authorPhoto: r.authorAttribution?.photoUri || null,
        relativeTime: r.relativePublishTimeDescription || '',
        publishTime: r.publishTime || '',
      });
    }
  }
  featured.sort((a, b) => b.publishTime.localeCompare(a.publishTime));

  const primary = ok.find((p) => p.primary) || ok[0];
  return {
    rating: Math.round((weighted / count) * 10) / 10,
    count,
    mapsUrl: primary.data!.googleMapsUri || null,
    featured,
  };
}

/** 沒設 key、或沒有任何 placeId、或全部抓失敗 → null（頁面 404，不對外顯示半成品） */
export async function getGoogleReviews(): Promise<ReviewSummary | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  const targets = REVIEW_PLACES.filter((p) => p.placeId);
  if (targets.length === 0) return null;
  const data = await Promise.all(targets.map((p) => fetchPlace(p.placeId!, key)));
  return combine(targets.map((p, i) => ({ primary: p.primary, data: data[i] })));
}

export const reviewsEnabled = () => !!process.env.GOOGLE_PLACES_API_KEY && REVIEW_PLACES.some((p) => p.placeId);
