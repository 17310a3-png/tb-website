import type { Project } from '@/lib/projects';
import Reveal from './Reveal';
import PortfolioGrid from './PortfolioGrid';

export default function Portfolio({ projects }: { projects: Project[] }) {
  const featured = projects.find((p) => p.is_featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section id="portfolio" style={{ background: 'var(--black)', padding: '120px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 32, flexWrap: 'wrap' }}>
        <div>
          <Reveal className="eyebrow"><span className="eyebrow-text">Portfolio</span></Reveal>
          <Reveal><h2 className="section-title">每一個完工，<br />都是需求被真正理解的結果</h2></Reveal>
        </div>
        <Reveal>
          <p className="section-body" style={{ fontSize: '0.88rem', maxWidth: 320 }}>
            好的作品不只是好看，更要能回應屋主的生活方式。以下是我們的實際完工案例。
          </p>
        </Reveal>
      </div>

      {featured && (
        <>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ width: 3, height: 20, background: 'var(--yellow)' }} />
              <span style={{ fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif", fontSize: '0.78rem', color: 'var(--yellow)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Featured Case</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--light-gray)' }}>{featured.name}{featured.style ? `｜${featured.style}` : ''}</span>
            </div>
          </Reveal>

          <Reveal y={0}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 4, marginBottom: 4 }} className="pf-feature-top">
              {featured.images.slice(0, 2).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} loading="lazy" alt={`${featured.name} ${i + 1}`} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
              ))}
            </div>
          </Reveal>

          {featured.images.length > 2 && (
            <Reveal y={0}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4 }} className="pf-feature-bottom">
                {featured.images.slice(2, 6).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} loading="lazy" alt={`${featured.name} 細節 ${i + 1}`} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', marginTop: 32 }} className="pf-spec">
              <SpecCell label="TYPE" value={featured.category} />
              <SpecCell label="STYLE" value={featured.style ?? '—'} />
              <SpecCell label="LOCATION" value={featured.location ?? '—'} />
              <div style={{ background: 'var(--near-black)', padding: '24px 28px' }}>
                <div style={{ fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif", fontSize: '0.7rem', color: 'var(--yellow)', letterSpacing: '0.25em', marginBottom: 8, fontWeight: 600 }}>CONTACT</div>
                <a href="#contact" style={{ fontSize: '0.9rem', color: 'var(--yellow)', fontWeight: 700, textDecoration: 'none' }}>想做類似風格 →</a>
              </div>
            </div>
          </Reveal>
        </>
      )}

      {rest.length > 0 && (
        <>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '72px 0 28px' }}>
              <div style={{ width: 3, height: 20, background: 'var(--yellow)' }} />
              <span style={{ fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif", fontSize: '0.78rem', color: 'var(--yellow)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>More Projects</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--light-gray)' }}>更多完工案例</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--gray)', whiteSpace: 'nowrap' }}>← 左右滑動看更多 →</span>
            </div>
          </Reveal>
          <PortfolioGrid projects={rest} />
        </>
      )}

      <Reveal>
        <div style={{ textAlign: 'center', marginTop: 56, padding: 48, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '1rem', color: 'var(--light-gray)', marginBottom: 24, lineHeight: 1.8 }}>
            喜歡這樣的風格或格局思路？<br />
            歡迎預約諮詢，我們依照你的房屋條件，提出更適合的規劃建議。
          </div>
          <a href="#contact" className="btn-yellow">預約諮詢，討論你的空間</a>
        </div>
      </Reveal>
    </section>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--near-black)', padding: '24px 28px' }}>
      <div style={{ fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif", fontSize: '0.7rem', color: 'var(--yellow)', letterSpacing: '0.25em', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--white-pure)', fontWeight: 700 }}>{value}</div>
    </div>
  );
}
