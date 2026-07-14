'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  ['#about', '關於我們'],
  ['#services', '服務項目'],
  ['#process', '服務流程'],
  ['#portfolio', '作品案例'],
  ['#why', '為何選擇'],
  ['#locations', '門市據點'],
  ['#faq', '常見問題'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/mark-white.png" alt="統包先生 Logo" className="nav-logo-icon" width={300} height={300} />
          <span className="nav-logo-text">
            <span className="nav-logo-cn">統包先生</span>
            <span className="nav-logo-en">MR.TURNKEY</span>
          </span>
        </a>
        <ul className="nav-links">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta">預約諮詢</a>
          </li>
        </ul>
        <button
          type="button"
          className="hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '關閉選單' : '開啟選單'}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${open ? ' open' : ''}`}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>預約諮詢</a>
      </div>
    </>
  );
}
