const SERVICE_LINKS = ['舊屋翻新', '商業空間', '室內裝修', '預售屋客變', '工程發包管理', '完工驗收售後'];
const BRAND_LINKS: [string, string][] = [
  ['#about', '關於統包先生'],
  ['#process', '服務流程'],
  ['#portfolio', '作品案例'],
  ['#why', '為什麼選擇我們'],
  ['#locations', '門市據點'],
  ['#faq', '常見問題'],
];
const STORE_LINKS = ['新北市五股店', '台北市東門店', '桃園慈文店', '台中烏日店'];

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo/mark-white.png" alt="統包先生" className="footer-logo-img" />
            <div className="footer-logo-text">
              <span className="footer-brand-cn">統包先生</span>
              <span className="footer-brand-en">MR.TURNKEY</span>
            </div>
          </div>
          <p className="footer-tagline">住宅裝修整合服務品牌。透明流程、專業分工、安心交付。從設計、工程到監工，讓裝修更簡單。</p>
          <div className="footer-service-tags">
            <div className="footer-tag">舊屋翻新</div>
            <div className="footer-tag">商業空間</div>
            <div className="footer-tag">室內裝修</div>
          </div>
        </div>
        <div>
          <div className="footer-col-title">服務項目</div>
          <ul className="footer-links">
            {SERVICE_LINKS.map((s) => <li key={s}><a href="#services">{s}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="footer-col-title">品牌資訊</div>
          <ul className="footer-links">
            {BRAND_LINKS.map(([href, label]) => <li key={label}><a href={href}>{label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="footer-col-title">服務據點</div>
          <ul className="footer-links">
            {STORE_LINKS.map((s) => <li key={s}><a href="#locations">{s}</a></li>)}
          </ul>
          <div style={{ marginTop: 20, padding: 14, background: 'var(--yellow-faint)', border: '1px solid rgba(249,185,27,0.15)' }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.68rem', color: 'var(--yellow)', letterSpacing: '0.25em', marginBottom: 6 }}>CONTACT</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>官方 LINE 諮詢<br />預約到店服務</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2026 統包先生 MR.TURNKEY. All Rights Reserved.</div>
        <div className="footer-copy">室內裝修整合服務品牌 · 舊屋翻新 · 商業空間 · 室內裝修</div>
      </div>
    </footer>
  );
}
