'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-stripes" />
      <div className="hero-gradient" />
      <div className="hero-top-bar" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/assets/logo/mark-white.png"
        alt=""
        width={300}
        height={300}
        className="hero-bg-logo"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}>
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">住宅裝修整合服務品牌</span>
        </motion.div>
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
          裝修，<br />
          不該靠<span className="accent">運氣。</span>
        </motion.h1>
        <motion.div className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25, ease }}>
          MR. TURNKEY
        </motion.div>
        <motion.p className="hero-desc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }}>
          我們以住宅裝修為核心，整合設計、工程發包、施工管理與售後服務，用更透明的流程、更明確的分工，陪你把理想空間一步一步落地。
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
          <a href="#contact" className="btn-yellow">立即預約諮詢</a>
          <a href="#services" className="btn-outline">查看服務項目</a>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
