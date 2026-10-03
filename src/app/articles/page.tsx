import type { Metadata } from 'next';
import { getArticles, articlePath, readMinutes, CATEGORY_ORDER } from '@/lib/articles';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';
import Reveal from '@/components/Reveal';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '裝修知識｜合約、預算、水電、木工、驗收、選材',
  description:
    '統包先生整理的裝修知識：合約怎麼看、舊屋翻新預算怎麼抓、改水電和木工最常被坑的地方、完工驗收清單、廚房浴室臥室的選材與規劃細節。每篇都是現場經驗，不是教科書。',
  alternates: { canonical: '/articles' },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: '統包先生 MR.TURNKEY',
    title: '裝修知識｜統包先生 MR.TURNKEY',
    description: '合約、預算、水電、木工、驗收、選材，裝修前該知道的事。',
    url: '/articles',
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function ArticlesPage() {
  const articles = getArticles();
  const cats = CATEGORY_ORDER.filter((c) => articles.some((a) => a.category === c));
  const others = [...new Set(articles.map((a) => a.category))].filter((c) => !CATEGORY_ORDER.includes(c));

  return (
    <>
      <FloatCta />
      <Nav />
      <main className="pp">
        <header className="pp-head">
          <Reveal>
            <div className="pp-crumb" role="navigation" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">／</span>
              <span>裝修知識</span>
            </div>
          </Reveal>
          <Reveal className="eyebrow"><span className="eyebrow-text">Articles</span></Reveal>
          <Reveal><h1 className="pp-title">裝修知識</h1></Reveal>
          <Reveal>
            <p className="pp-meta"><span>{articles.length} 篇</span><span>合約、預算、水電、木工、驗收、選材，簽約前和開工前要知道的事</span></p>
          </Reveal>
        </header>

        <Reveal className="art-cats" as="div" aria-label="分類">
          {[...cats, ...others].map((c) => (
            <a key={c} href={`#cat-${c}`} className="art-cat-chip">{c}</a>
          ))}
        </Reveal>

        {[...cats, ...others].map((c) => {
          const list = articles.filter((a) => a.category === c);
          return (
            <section key={c} id={`cat-${c}`} className="art-section" aria-label={c}>
              <Reveal>
                <div className="art-section-head">
                  <div className="eyebrow" style={{ marginBottom: 0 }}><span className="eyebrow-text">{c}</span></div>
                  <span className="art-section-count">{list.length} 篇</span>
                </div>
              </Reveal>
              <div className="art-grid">
                {list.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 0.05} as="div">
                    <a href={articlePath(a.slug)} className="art-card">
                      <div className="art-card-meta">
                        <span>{a.date}</span>
                        <span>約 {readMinutes(a.chars)} 分鐘</span>
                      </div>
                      <h2 className="art-card-title">{a.title}</h2>
                      <p className="art-card-desc">{a.description}</p>
                      <span className="art-card-more">閱讀全文 →</span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
