import Reveal from './Reveal';

const STORES: { name: string; addr: string; area: string }[] = [
  { name: '新北市五股店', addr: '新北市五股區新五路二段 341 號', area: '新北市北區、林口、泰山' },
  { name: '台北市東門店', addr: '台北市中正區信義路二段 129 號 2 樓', area: '台北市中心、大安、信義' },
  { name: '桃園慈文店', addr: '桃園市桃園區慈文路 470 號', area: '桃園市各區' },
  { name: '台中烏日店', addr: '台中市烏日區三榮路一段 75 號', area: '烏日、大里、霧峰' },
];

const mapUrl = (addr: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('統包先生 ' + addr)}`;

export default function Locations() {
  return (
    <section id="locations">
      <div className="locations-head">
        <div>
          <Reveal className="eyebrow"><span className="eyebrow-text">Locations</span></Reveal>
          <Reveal><h2 className="section-title">把服務做近，<br />也把標準做穩</h2></Reveal>
        </div>
        <Reveal>
          <p className="section-body" style={{ fontSize: '0.88rem', maxWidth: 360 }}>
            統包先生持續拓展服務據點，讓更多客戶在更近的距離，獲得同樣專業且有制度的裝修服務。
          </p>
        </Reveal>
      </div>

      <div className="locations-grid">
        {STORES.map((s, i) => (
          <Reveal className="location-card" key={s.name} delay={(i % 3) * 0.06}>
            <div className="location-name">🏪 {s.name}</div>
            <div className="location-row">
              <span className="location-icon">📍</span>
              <span className="location-info">{s.addr}</span>
            </div>
            <div className="location-row">
              <span className="location-icon">🗺️</span>
              <span className="location-info">服務區域：{s.area}</span>
            </div>
            <a className="location-badge" href={mapUrl(s.addr)} target="_blank" rel="noopener noreferrer">查看地圖</a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{ marginTop: 24, border: '1px solid var(--border)', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '1.2rem' }}>📡</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
            目前服務據點涵蓋雙北、桃園、台中，更多門市持續建置中。統包先生持續拓展，讓每一個城市都有離你最近的裝修夥伴。
          </span>
        </div>
      </Reveal>
    </section>
  );
}
