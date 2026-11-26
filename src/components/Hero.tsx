/** 首屏。2026-11-26 改用純 CSS 進場（.hero-in），不等 JS hydration：
 *  大標題只做位移不做淡入，第一次繪製就看得到（LCP 不被動畫拖慢）。 */
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-stripes" />
      <div className="hero-gradient" />
      <div className="hero-top-bar" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo/mark-white.png" alt="" width={300} height={300} className="hero-bg-logo" aria-hidden="true" />

      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-eyebrow hero-in" style={{ animationDelay: '0s' }}>
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">室內裝修・室內設計整合服務品牌</span>
        </div>
        <h1 className="hero-title hero-rise">
          裝修，<br />
          不該靠<span className="accent">運氣。</span>
        </h1>
        <div className="hero-subtitle hero-in" style={{ animationDelay: '0.2s' }}>MR. TURNKEY</div>
        <p className="hero-desc hero-rise" style={{ animationDelay: '0.1s' }}>
          我們以住宅裝修為核心，整合設計、工程發包、施工管理與售後服務，用更透明的流程、更明確的分工，陪你把理想空間一步一步落地。
        </p>
        <div className="hero-actions hero-in" style={{ animationDelay: '0.35s' }}>
          <a href="#contact" className="btn-yellow">立即預約諮詢</a>
          <a href="#services" className="btn-outline">查看服務項目</a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
