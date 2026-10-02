// 查 /reviews 要用的 Google Place ID（只需跑一次，結果手動填回 src/lib/reviews.ts 的 placeId）
// 用法：GOOGLE_PLACES_API_KEY=xxx node scripts/resolve-places.mjs
// 每個搜尋字列出前 3 個候選（名稱 / 地址 / 評分 / 評論數），人工確認是對的那間再填
import { readFileSync } from 'node:fs';

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) { console.error('缺 GOOGLE_PLACES_API_KEY'); process.exit(1); }

// 搜尋字以 reviews.ts 為單一來源
const src = readFileSync(new URL('../src/lib/reviews.ts', import.meta.url), 'utf8');
const entries = [...src.matchAll(/label: '([^']+)', query: '([^']+)'/g)].map((m) => ({ label: m[1], query: m[2] }));

for (const { label, query } of entries) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'zh-TW', regionCode: 'TW', pageSize: 3 }),
  });
  const data = await res.json();
  console.log(`\n=== ${label}（搜「${query}」）`);
  if (!res.ok) { console.log('ERROR', JSON.stringify(data).slice(0, 300)); continue; }
  for (const p of data.places || []) {
    console.log(`  ${p.id}  ${p.displayName?.text}｜${p.formattedAddress}｜${p.rating ?? '-'} 星 / ${p.userRatingCount ?? 0} 則`);
  }
}
