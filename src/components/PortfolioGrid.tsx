'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/projects';

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <motion.button
            type="button"
            className="proj-card"
            key={p.id}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover_url} loading="lazy" alt={p.name} />
            <div className="proj-overlay">
              <span className="proj-type">{p.category}</span>
              <span className="proj-name">{p.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pf-modal-backdrop"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="pf-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pf-modal-head">
                <div>
                  <span className="proj-type">{active.category}</span>
                  <h3 className="pf-modal-title">{active.name}</h3>
                  {active.location && <span className="pf-modal-meta">{active.location}{active.style ? ` · ${active.style}` : ''}</span>}
                </div>
                <button type="button" className="pf-modal-close" onClick={() => setActive(null)} aria-label="關閉">×</button>
              </div>
              {active.description && <p className="pf-modal-desc">{active.description}</p>}
              <div className="pf-modal-gallery">
                {active.images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} loading="lazy" alt={`${active.name} ${i + 1}`} />
                ))}
              </div>
              <a href="#contact" className="btn-yellow" onClick={() => setActive(null)} style={{ alignSelf: 'flex-start' }}>想做類似風格，預約諮詢 →</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
