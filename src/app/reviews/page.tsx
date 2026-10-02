import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGoogleReviews } from '@/lib/reviews';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';
import Reveal from '@/components/Reveal';

// Google 評論每天更新一次（Places API 條款不可長期存評論內容，只靠 ISR 快取）
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGoogleReviews();
  if (!data) return { title: '客戶評價', robots: { index: false } };
  const title = `統包先生評價｜Google 評論 ${data.rating.toFixed(1)} 星・${data.count} 則真實回饋`;
  const description = `統包先生 MR.TURNKEY 在 Google 地圖的真實客戶評價：綜合 ${data.rating.toFixed(1)} 星、共 ${data.count} 則評論。看看裝修過的客戶怎麼說報價、工期、施工品質與售後保固。`;
  return {
    title,
    description,
    alternates: { canonical: '/reviews' },
    openGraph: {
      type: 'website', locale: 'zh_TW', siteName: '統包先生 MR.TURNKEY',
      title, description, url: '/reviews',
      images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

function Stars({ value, size = '1rem' }: { value: number; size?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className="rev-stars" style={{ fontSize: size }} role="img" aria-label={`${value} 顆星（滿分 5 顆）`}>
      <span className="rev-stars-base" aria-hidden="true">★★★★★</span>
      <span className="rev-stars-fill" aria-hidden="true" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
}

export default async function ReviewsPage() {
  const data = await getGoogleReviews();
  if (!data) notFound();

  return (
    <>
      <FloatCta />
      <Nav />
      <main className="pp">
        <header className="pp-head">
          <Reveal>
            <div className="pp-crumb" role="navigation" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">／</span>
              <span>客戶評價</span>
            </div>
          </Reveal>
          <Reveal className="eyebrow"><span className="eyebrow-text">Reviews</span></Reveal>
          <Reveal><h1 className="pp-title">裝修過的客戶，<br />怎麼說統包先生</h1></Reveal>
        </header>

        <Reveal as="section" className="rev-score">
          <div className="rev-score-num">{data.rating.toFixed(1)}</div>
          <div className="rev-score-side">
            <Stars value={data.rating} size="1.6rem" />
            <div className="rev-score-count">共 {data.count.toLocaleString('zh-TW')} 則 Google 評論</div>
            <div className="rev-score-src">資料來源：Google 地圖，每日自動更新</div>
          </div>
          {data.mapsUrl && (
            <a className="rev-score-link" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
              到 Google 地圖看更多評論 →
            </a>
          )}
        </Reveal>

        {data.featured.length > 0 && (
          <section className="art-section" aria-label="精選評論">
            <Reveal>
              <div className="art-section-head">
                <div className="eyebrow" style={{ marginBottom: 0 }}><span className="eyebrow-text">精選評論</span></div>
                <span className="rev-note">以下為 4～5 星評論精選，上方總評分包含全部評論</span>
              </div>
            </Reveal>
            <div className="art-grid">
              {data.featured.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 0.05} as="div">
                  <article className="art-card rev-card">
                    <div className="rev-card-top">
                      <Stars value={r.rating} />
                      <span className="rev-card-time">{r.relativeTime}</span>
                    </div>
                    <p className="rev-card-text">{r.text}</p>
                    <div className="rev-card-author">
                      {r.authorPhoto && (
                        // Google 作者頭像（googleusercontent），用一般 img 免設 next/image 白名單
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.authorPhoto} alt="" width={28} height={28} loading="lazy" referrerPolicy="no-referrer" />
                      )}
                      {r.authorUrl
                        ? <a href={r.authorUrl} target="_blank" rel="noopener noreferrer nofollow">{r.author}</a>
                        : <span>{r.author}</span>}
                      <span className="rev-card-via">Google 地圖</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <Reveal as="section" className="rev-cta">
          <p>想知道你家的狀況要怎麼做、大概多少錢？</p>
          <a href="/#contact" className="rev-cta-btn">預約免費諮詢 →</a>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
