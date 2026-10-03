'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { STORES, storePath, mapUrl } from '@/lib/stores';

/** 門市據點：左邊 9 店清單（點選切換），右邊 Google 地圖跳到該店。
 *  地圖用 Google Maps 的 output=embed 內嵌，不需要 API key。
 *  店名與地址都是真正的 <a>/文字，Google 抓首頁時看得到 9 間門市與分店頁連結。 */
const embedUrl = (addr: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent('統包先生 ' + addr)}&z=16&hl=zh-TW&output=embed`;

export default function Locations() {
  const [active, setActive] = useState(0);
  const s = STORES[active];

  return (
    <section id="locations">
      <div className="locations-head">
        <div>
          <Reveal className="eyebrow"><span className="eyebrow-text">Locations</span></Reveal>
          <Reveal><h2 className="section-title">裝修門市據點</h2><p className="section-sub">把服務做近，也把標準做穩</p></Reveal>
        </div>
        <Reveal>
          <p className="section-body" style={{ fontSize: '0.88rem', maxWidth: 360 }}>
            {STORES.length} 間門市，服務雙北、桃園、新竹、台中。各店做法與標準相同，就近到店談最快。
          </p>
        </Reveal>
      </div>

      <Reveal y={0}>
        <div className="loc-layout">
          <ul className="loc-list" aria-label="門市清單">
            {STORES.map((st, i) => (
              <li key={st.slug}>
                <button
                  type="button"
                  className={`loc-item${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <span className="loc-item-name">{st.name}</span>
                  <span className="loc-item-addr">{st.addr}</span>
                  <span className="loc-item-area">{st.area}</span>
                </button>
                <a href={storePath(st.slug)} className="loc-item-link">門市介紹 →</a>
              </li>
            ))}
          </ul>

          <div className="loc-map">
            <div className="loc-map-head">
              <span className="loc-map-name">{s.name}</span>
              <span className="loc-map-addr">{s.addr}</span>
              <a href={mapUrl(s.addr)} target="_blank" rel="noopener noreferrer" className="loc-map-open">在 Google 地圖開啟 →</a>
            </div>
            <iframe
              key={s.slug}
              src={embedUrl(s.addr)}
              title={`${s.name} 地圖`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
