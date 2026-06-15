'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const HOUSE_TYPES = ['舊屋翻新', '商業空間', '室內裝修（新成屋）', '預售屋客變', '其他'];
const SIZES = ['20坪以下', '20–35坪', '35–50坪', '50坪以上'];
const REGIONS = ['台北市', '新北市', '桃園市', '台中市', '新竹市/縣', '其他'];
const BUDGETS = ['50萬以內', '50–100萬', '100–200萬', '200萬以上', '尚未確定'];

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || '#';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '', phone: '', house_type: '', size: '', region: '', budget: '', message: '',
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('ok');
      setForm({ name: '', phone: '', house_type: '', size: '', region: '', budget: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact">
      <div className="contact-corner" />
      <div className="contact-layout">
        <Reveal>
          <div className="eyebrow"><span className="eyebrow-text">Contact</span></div>
          <div className="contact-tagline">把你的需求告訴我們，<br />剩下的，讓專業來接手。</div>
          <p className="contact-sub">
            無論你正在準備交屋、規劃翻新，或只是想先釐清預算與方向，都歡迎先與統包先生聊聊。一次清楚的諮詢，能讓後面的每一步少一點摸索，多一點安心。
          </p>
          <a className="contact-line-cta" href={LINE_URL} target="_blank" rel="noopener noreferrer">
            <div className="line-icon">💬</div>
            <div className="contact-line-cta-text">
              <h4>加入官方 LINE 立即洽詢</h4>
              <p>最快速的諮詢方式，回覆迅速</p>
            </div>
            <div className="line-arrow">›</div>
          </a>
        </Reveal>

        <Reveal as="div">
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">姓名</label>
                <input id="name" type="text" className="form-input" placeholder="您的大名" value={form.name} onChange={(e) => set('name', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">聯絡電話</label>
                <input id="phone" type="tel" className="form-input" placeholder="0912-345-678" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="house_type">房屋類型</label>
                <select id="house_type" className="form-select" value={form.house_type} onChange={(e) => set('house_type', e.target.value)}>
                  <option value="">請選擇</option>
                  {HOUSE_TYPES.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="size">室內坪數</label>
                <select id="size" className="form-select" value={form.size} onChange={(e) => set('size', e.target.value)}>
                  <option value="">請選擇</option>
                  {SIZES.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="region">房屋所在地</label>
                <select id="region" className="form-select" value={form.region} onChange={(e) => set('region', e.target.value)}>
                  <option value="">請選擇</option>
                  {REGIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="budget">預算範圍</label>
                <select id="budget" className="form-select" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                  <option value="">請選擇</option>
                  {BUDGETS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">想優先解決的問題</label>
              <textarea id="message" className="form-textarea" placeholder="請簡單描述您目前最在意的需求或問題⋯" value={form.message} onChange={(e) => set('message', e.target.value)} />
            </div>
            <button type="submit" className="btn-yellow" style={{ width: '100%', textAlign: 'center', padding: 16, fontSize: '0.9rem', clipPath: 'none', opacity: status === 'sending' ? 0.6 : 1 }} disabled={status === 'sending'}>
              {status === 'sending' ? '送出中⋯' : status === 'ok' ? '已收到，我們會盡快與您聯繫 ✓' : '送出預約資料 →'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#ff8a8a', fontSize: '0.82rem' }}>送出失敗，請確認姓名與電話已填寫，或改用官方 LINE 聯繫。</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
