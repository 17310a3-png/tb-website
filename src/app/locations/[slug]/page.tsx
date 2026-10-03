import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { STORES, getStore, storePath, mapUrl } from '@/lib/stores';
import { getProjects, projectPath, hasLocation } from '@/lib/projects';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';
import Reveal from '@/components/Reveal';
import ConversionLink from '@/components/ConversionLink';

// 分店頁：靜態資料在 stores.ts，案例從 Supabase 讀，與作品頁同樣 ISR 60 秒
export const revalidate = 60;
export const dynamicParams = false;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mrturnkey.com.tw';
const SURVEYCAKE_URL = process.env.NEXT_PUBLIC_SURVEYCAKE_URL || 'https://www.surveycake.com/s/Ad81e';


/** 以字串為種子的穩定洗牌（mulberry32），同一店每次重建結果一致，不同店組合不同 */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  let a = h >>> 0;
  const rand = () => { a = (a + 0x6d2b79f5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getStore(slug);
  if (!s) return { title: '找不到這間門市' };
  const title = `${s.district}室內裝修・舊屋翻新・新成屋裝修｜統包先生${s.short}`;
  const description = `統包先生${s.name}，服務${s.area}。承接${s.district}住宅全室裝修：舊屋翻新、新成屋裝修、預售屋客變與商業空間，水電、木作、泥作、衛浴、廚具一次整合。地址：${s.addr}，歡迎預約到店諮詢。`;
  return {
    // 標題裡已有「統包先生X店」，不再套 layout 的「｜統包先生 MR.TURNKEY」後綴，避免 SERP 截斷
    title: { absolute: title },
    description,
    alternates: { canonical: storePath(s.slug) },
    openGraph: { type: 'website', locale: 'zh_TW', siteName: '統包先生 MR.TURNKEY', title, description, url: storePath(s.slug), images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/assets/og-image.jpg'] },
  };
}

export default async function StorePage({ params }: Params) {
  const { slug } = await params;
  const s = getStore(slug);
  if (!s) notFound();

  // 完工案例不綁分店（有些區域案例少會空），改用店 slug 當種子打散，每店固定拿 6 組、各店組合不同
  const all = await getProjects();
  const cases = seededShuffle(all, s.slug).slice(0, 6);
  const others = STORES.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: SITE },
          { '@type': 'ListItem', position: 2, name: '門市據點', item: `${SITE}/#locations` },
          { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE}${storePath(s.slug)}` },
        ],
      },
      {
        '@type': 'HomeAndConstructionBusiness',
        name: `統包先生 ${s.name}`,
        url: `${SITE}${storePath(s.slug)}`,
        image: `${SITE}/assets/og-image.jpg`,
        logo: `${SITE}/assets/logo/mark-white.png`,
        address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: s.region, streetAddress: s.street },
        areaServed: s.served.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
        hasMap: mapUrl(s.addr),
        priceRange: '$$',
        parentOrganization: { '@type': 'Organization', name: '統包先生 MR.TURNKEY', url: SITE },
        knowsAbout: ['舊屋翻新', '新成屋裝修', '室內裝修', '預售屋客變', '商業空間', '水電工程', '木作工程', '衛浴翻新', '廚具改造'],
      },
    ],
  };

  return (
    <>
      <FloatCta />
      <Nav />

      <main className="pp">
        <header className="pp-head">
          <Reveal>
            <div className="pp-crumb" role="navigation" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">／</span>
              <a href="/#locations">門市據點</a><span aria-hidden="true">／</span>
              <span>{s.name}</span>
            </div>
          </Reveal>
          <Reveal className="eyebrow"><span className="eyebrow-text">{s.region} · Location</span></Reveal>
          <Reveal><h1 className="pp-title">{s.district}室內裝修<br />統包先生{s.short}</h1></Reveal>
          <Reveal>
            <p className="pp-meta">
              <span>{s.addr}</span>
              <span>服務：{s.area}</span>
            </p>
          </Reveal>
        </header>

        <div className="pp-body">
          <Reveal className="pp-desc">
            <h2 className="pp-h2">{s.short}在做什麼</h2>
            <p>{s.intro[0]}</p>
            <p style={{ marginTop: 16 }}>{s.intro[1]}</p>
          </Reveal>

          <Reveal className="pp-spec">
            <div className="pp-spec-cell">
              <div className="pp-spec-label">ADDRESS</div>
              <div className="pp-spec-value">{s.addr}</div>
              <a href={mapUrl(s.addr)} target="_blank" rel="noopener noreferrer" className="pp-spec-link" style={{ display: 'inline-block', marginTop: 8, fontSize: '0.8rem' }}>Google 地圖 →</a>
            </div>
            <div className="pp-spec-cell"><div className="pp-spec-label">SERVICE AREA</div><div className="pp-spec-value">{s.area}</div></div>
            <div className="pp-spec-cell"><div className="pp-spec-label">SCOPE</div><div className="pp-spec-value">住宅全室裝修・舊屋翻新・新成屋・商業空間</div></div>
            <div className="pp-spec-cell">
              <div className="pp-spec-label">CONTACT</div>
              <ConversionLink source={`store-${s.slug}`} href={SURVEYCAKE_URL} target="_blank" rel="noopener noreferrer" className="pp-spec-link">預約{s.short}諮詢 →</ConversionLink>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="sp-note">
            {s.short}承接的項目和其他門市相同：住宅全室裝修（新成屋、舊屋翻新、預售屋客變）與商業空間，不單獨承接局部工程。
            工程內容見 <a href="/#services">服務項目</a>。
          </p>
        </Reveal>


        {cases.length > 0 && (
          <section className="pp-related" aria-label="完工案例">
            <Reveal>
              <div className="pp-related-head">
                <div className="eyebrow" style={{ marginBottom: 0 }}><span className="eyebrow-text">完工案例</span></div>
                <a href="/#portfolio" className="pp-related-all">看全部案例 →</a>
              </div>
            </Reveal>
            <div className="pp-related-grid">
              {cases.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06} className="pp-related-item">
                  <a href={projectPath(r.slug)} className="proj-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover_url} loading="lazy" alt={`${r.name} ${r.category}完工案例`} width={800} height={600} />
                    <div className="proj-overlay">
                      <span className="proj-type">{hasLocation(r) ? r.location : r.category}</span>
                      <span className="proj-name">{r.name}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <Reveal>
          <div className="pp-cta">
            <div className="pp-cta-text">
              在{s.district}一帶準備裝修？<br />
              先填預約表單，{s.short}會依你的房屋條件安排顧問與你聯繫。
            </div>
            <ConversionLink source={`store-${s.slug}-cta`} href={SURVEYCAKE_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow">預約{s.short}諮詢</ConversionLink>
          </div>
        </Reveal>

        <section className="sp-others" aria-label="其他門市">
          <Reveal><div className="eyebrow"><span className="eyebrow-text">Other Locations</span></div></Reveal>
          <div className="sp-others-list">
            {others.map((o) => (
              <a key={o.slug} href={storePath(o.slug)} className="sp-other">
                <span className="sp-other-name">{o.name}</span>
                <span className="sp-other-area">{o.area}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
