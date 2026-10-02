import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getArticles, articlePath, readMinutes } from '@/lib/articles';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';
import Reveal from '@/components/Reveal';
import ConversionLink from '@/components/ConversionLink';

export const dynamic = 'force-static';
export const dynamicParams = false;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mrturnkey.com.tw';
const SURVEYCAKE_URL = process.env.NEXT_PUBLIC_SURVEYCAKE_URL || 'https://www.surveycake.com/s/Ad81e';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: '找不到這篇文章' };
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: articlePath(a.slug) },
    openGraph: {
      type: 'article',
      locale: 'zh_TW',
      siteName: '統包先生 MR.TURNKEY',
      title: `${a.title}｜統包先生 MR.TURNKEY`,
      description: a.description,
      url: articlePath(a.slug),
      publishedTime: a.date,
      images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description, images: ['/assets/og-image.jpg'] },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const all = getArticles().filter((x) => x.slug !== a.slug);
  const related = [...all.filter((x) => x.category === a.category), ...all.filter((x) => x.category !== a.category)].slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: SITE },
          { '@type': 'ListItem', position: 2, name: '裝修知識', item: `${SITE}/articles` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${SITE}${articlePath(a.slug)}` },
        ],
      },
      {
        '@type': 'Article',
        headline: a.title,
        description: a.description,
        datePublished: a.date,
        dateModified: a.date,
        inLanguage: 'zh-TW',
        articleSection: a.category,
        image: `${SITE}/assets/og-image.jpg`,
        mainEntityOfPage: `${SITE}${articlePath(a.slug)}`,
        author: { '@type': 'Organization', name: '統包先生 MR.TURNKEY', url: SITE },
        publisher: { '@type': 'Organization', name: '統包先生 MR.TURNKEY', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/assets/logo/mark-white.png` } },
      },
    ],
  };

  return (
    <>
      <FloatCta />
      <Nav />
      <main className="pp art">
        <header className="pp-head">
          <Reveal>
            <div className="pp-crumb" role="navigation" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">／</span>
              <a href="/articles">裝修知識</a><span aria-hidden="true">／</span>
              <span>{a.category}</span>
            </div>
          </Reveal>
          <Reveal className="eyebrow"><span className="eyebrow-text">{a.category}</span></Reveal>
          <Reveal><h1 className="pp-title art-title">{a.title}</h1></Reveal>
          <Reveal>
            <p className="pp-meta">
              <span>{a.date}</span>
              <span>約 {readMinutes(a.chars)} 分鐘</span>
              <span>統包先生</span>
            </p>
          </Reveal>
        </header>

        <Reveal y={0}>
          <p className="art-lead">{a.description}</p>
        </Reveal>

        <Reveal y={0}>
          <article className="art-body" dangerouslySetInnerHTML={{ __html: a.html }} />
        </Reveal>

        <Reveal>
          <div className="pp-cta">
            <div className="pp-cta-text">
              看完有問題，或想知道自己家的狀況怎麼估？<br />
              填預約表單，我們依你的房屋條件安排顧問與你聯繫。
            </div>
            <ConversionLink source={`article-${a.slug}`} href={SURVEYCAKE_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow">預約諮詢</ConversionLink>
          </div>
        </Reveal>

        {related.length > 0 && (
          <section className="art-related" aria-label="延伸閱讀">
            <Reveal>
              <div className="pp-related-head">
                <div className="eyebrow" style={{ marginBottom: 0 }}><span className="eyebrow-text">延伸閱讀</span></div>
                <a href="/articles" className="pp-related-all">全部文章 →</a>
              </div>
            </Reveal>
            <div className="art-grid">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06} as="div">
                  <a href={articlePath(r.slug)} className="art-card">
                    <div className="art-card-meta"><span>{r.category}</span><span>約 {readMinutes(r.chars)} 分鐘</span></div>
                    <h2 className="art-card-title">{r.title}</h2>
                    <p className="art-card-desc">{r.description}</p>
                    <span className="art-card-more">閱讀全文 →</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
