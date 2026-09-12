'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { FAQS } from '@/lib/faqs';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq">
      <div className="faq-layout">
        <div className="faq-sticky">
          <Reveal className="eyebrow"><span className="eyebrow-text">FAQ</span></Reveal>
          <Reveal><h2 className="section-title">常見<br />問題</h2></Reveal>
          <Reveal>
            <p className="section-body" style={{ marginTop: 16, fontSize: '0.88rem' }}>
              有任何疑問，都可以先與我們諮詢。好的裝修，從一次清楚的溝通開始。
            </p>
          </Reveal>
          <div style={{ marginTop: 36 }}>
            <a href="#contact" className="btn-yellow">預約諮詢</a>
          </div>
        </div>

        <Reveal className="faq-list">
          {FAQS.map(([q, a], i) => (
            <div className={`faq-item${open === i ? ' open' : ''}`} key={i}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="faq-a" id={`faq-answer-${i}`}>
                <div className="faq-a-inner">{a}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
