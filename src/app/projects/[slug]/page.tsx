import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, getProjects, hasLocation, projectPath } from '@/lib/projects';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';
import Reveal from '@/components/Reveal';

// 作品內頁：與首頁同樣 ISR 60 秒；Supabase 新增案子後最多 60 秒自動出現，新 slug 也會即時產生
export const revalidate = 60;
export const dynamicParams = true;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mrturnkey.com.tw';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: '找不到這個案例' };

  const where = hasLocation(p) ? `${p.location} ` : '';
  const title = `${p.name}｜${where}${p.category}完工案例`;
  const description = (p.description ?? `${p.name} ${p.category}完工實景。${p.style ?? ''}`).slice(0, 150);

  return {
    title,
    description,
    alternates: { canonical: projectPath(p.slug) },
    openGraph: {
      type: 'article',
      locale: 'zh_TW',
      siteName: '統包先生 MR.TURNKEY',
      title: `${title}｜統包先生 MR.TURNKEY`,
      description,
      url: projectPath(p.slug),
      images: [{ url: p.cover_url, width: 1600, height: 1200 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [p.cover_url] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!p) notFound();

  // 相關案例：同分類優先，再補其他，共 3 個
  const others = all.filter((x) => x.id !== p.id);
  const related = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 3);

  const gallery = p.images.length ? p.images : [p.cover_url];
  const [hero, ...rest] = gallery;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: SITE },
          { '@type': 'ListItem', position: 2, name: '作品案例', item: `${SITE}/#portfolio` },
          { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE}${projectPath(p.slug)}` },
        ],
      },
      {
        '@type': 'ImageGallery',
        name: `${p.name} 完工案例`,
        description: p.description ?? undefined,
        url: `${SITE}${projectPath(p.slug)}`,
        image: gallery,
        author: { '@type': 'Organization', name: '統包先生 MR.TURNKEY', url: SITE },
        ...(hasLocation(p) ? { contentLocation: { '@type': 'Place', name: p.location } } : {}),
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
            {/* 用 div 不用 <nav>：globals.css 的 nav 選擇器是 position:fixed 的主選單樣式 */}
            <div className="pp-crumb" role="navigation" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">／</span>
              <a href="/#portfolio">作品案例</a><span aria-hidden="true">／</span>
              <span>{p.name}</span>
            </div>
          </Reveal>
          <Reveal className="eyebrow"><span className="eyebrow-text">{p.category}</span></Reveal>
          <Reveal><h1 className="pp-title">{p.name}</h1></Reveal>
          <Reveal>
            <p className="pp-meta">
              {hasLocation(p) && <span>{p.location}</span>}
              {p.style && <span>{p.style}</span>}
            </p>
          </Reveal>
        </header>

        <Reveal y={0}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt={`${p.name} ${p.category}完工實景 1`} className="pp-hero" width={1600} height={1000} />
        </Reveal>

        <div className="pp-body">
          <Reveal className="pp-desc">
            <h2 className="pp-h2">這個案子做了什麼</h2>
            {p.description ? (
              <p>{p.description}</p>
            ) : (
              <p>{p.name}的{p.category}完工實景。{p.style ? `風格方向：${p.style}。` : ''}想了解這個案子的規劃細節，歡迎預約諮詢。</p>
            )}
          </Reveal>

          <Reveal className="pp-spec">
            <div className="pp-spec-cell"><div className="pp-spec-label">TYPE</div><div className="pp-spec-value">{p.category}</div></div>
            <div className="pp-spec-cell"><div className="pp-spec-label">STYLE</div><div className="pp-spec-value">{p.style ?? '—'}</div></div>
            <div className="pp-spec-cell"><div className="pp-spec-label">LOCATION</div><div className="pp-spec-value">{hasLocation(p) ? p.location : '—'}</div></div>
            <div className="pp-spec-cell"><div className="pp-spec-label">CONTACT</div><a href="/#contact" className="pp-spec-link">想做類似風格 →</a></div>
          </Reveal>
        </div>

        {rest.length > 0 && (
          <section className="pp-gallery-wrap" aria-label="完工照片">
            <Reveal><h2 className="pp-h2">完工照片</h2></Reveal>
            <div className="pp-gallery">
              {rest.map((src, i) => (
                <Reveal key={src} y={16} delay={(i % 2) * 0.06}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} loading="lazy" alt={`${p.name} ${p.category}完工實景 ${i + 2}`} width={1600} height={1200} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="pp-related" aria-label="更多案例">
            <Reveal>
              <div className="pp-related-head">
                <div className="eyebrow" style={{ marginBottom: 0 }}><span className="eyebrow-text">More Projects</span></div>
                <a href="/#portfolio" className="pp-related-all">看全部案例 →</a>
              </div>
            </Reveal>
            <div className="pp-related-grid">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06} className="pp-related-item">
                  <a href={projectPath(r.slug)} className="proj-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover_url} loading="lazy" alt={r.name} width={800} height={600} />
                    <div className="proj-overlay">
                      <span className="proj-type">{r.category}</span>
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
              喜歡這樣的風格或格局思路？<br />
              歡迎預約諮詢，我們依照你的房屋條件，提出更適合的規劃建議。
            </div>
            <a href="/#contact" className="btn-yellow">預約諮詢，討論你的空間</a>
          </div>
        </Reveal>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
