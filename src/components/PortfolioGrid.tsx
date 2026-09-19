'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { projectPath, type Project } from '@/lib/projects';

/** 首頁「更多完工案例」橫向捲動卡片。卡片是真正的 <a> 連到 /projects/[slug]，Google 抓首頁時看得到每個案例的連結。 */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.proj-card');
    const step = card ? card.offsetWidth + 16 : 340;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <div className="proj-scroll-wrap">
      <button type="button" className="proj-arrow proj-arrow-left" aria-label="上一個" onClick={() => scrollByCards(-1)}>‹</button>
      <button type="button" className="proj-arrow proj-arrow-right" aria-label="下一個" onClick={() => scrollByCards(1)}>›</button>

      <div className="proj-scroll" ref={trackRef}>
        {projects.map((p, i) => (
          <motion.a
            href={projectPath(p.slug)}
            className="proj-card"
            key={p.id}
            aria-label={`${p.name} 完工案例`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover_url} loading="lazy" alt={p.name} width={800} height={600} />
            <div className="proj-overlay">
              <span className="proj-type">{p.category}</span>
              <span className="proj-name">{p.name}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
