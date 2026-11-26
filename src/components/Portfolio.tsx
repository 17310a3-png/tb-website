import { projectPath, type Project } from '@/lib/projects';
import Reveal from './Reveal';
import PortfolioGrid from './PortfolioGrid';

export default function Portfolio({ projects }: { projects: Project[] }) {
  const featured = projects.find((p) => p.is_featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section id="portfolio">
      <div className="pf-head">
        <Reveal>
          <h2 className="section-title">室內裝修完工案例</h2>
          <p className="section-sub">需求被聽懂，才會變成好用的家</p>
        </Reveal>
        <Reveal>
          <p className="section-body">
            {projects.length} 個完工現場，照片都是交屋時拍的。點進去看地點、風格和這個案子做了什麼。
          </p>
        </Reveal>
      </div>

      {featured && (
        <>
          <Reveal>
            <div className="pf-label">
              <span className="pf-label-title">主打案例</span>
              <span className="pf-label-sub">{featured.name}{featured.style ? `｜${featured.style}` : ''}</span>
              <a href={projectPath(featured.slug)} className="pf-more-link">查看完整案例 →</a>
            </div>
          </Reveal>

          <Reveal y={0}>
            {/* 兩張圖等高：高度由容器決定，不再各自用 aspect-ratio（1.6fr 那張會比 1fr 高很多） */}
            <div className="pf-feature-top">
              {featured.images.slice(0, 2).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} loading="lazy" alt={`${featured.name} ${i + 1}`} />
              ))}
            </div>
          </Reveal>

          {featured.images.length > 2 && (
            <Reveal y={0}>
              <div className="pf-feature-bottom">
                {featured.images.slice(2, 6).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} loading="lazy" alt={`${featured.name} 細節 ${i + 1}`} />
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="pf-spec">
              <SpecCell label="類型" value={featured.category} />
              <SpecCell label="風格" value={featured.style ?? '—'} />
              <SpecCell label="地點" value={featured.location ?? '—'} />
              <div className="pf-spec-cell">
                <div className="pf-spec-label">案例</div>
                <a href={projectPath(featured.slug)} className="pf-spec-link">看這個案子 →</a>
              </div>
            </div>
          </Reveal>
        </>
      )}

      {rest.length > 0 && (
        <>
          <Reveal>
            <div className="pf-label pf-more">
              <span className="pf-label-title">更多完工案例</span>
              <span className="pf-label-hint">← 左右滑動，點卡片看完整案例 →</span>
            </div>
          </Reveal>
          <PortfolioGrid projects={rest} />
        </>
      )}

      <Reveal>
        <div className="pf-cta">
          <div className="pf-cta-text">
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
    <div className="pf-spec-cell">
      <div className="pf-spec-label">{label}</div>
      <div className="pf-spec-value">{value}</div>
    </div>
  );
}
