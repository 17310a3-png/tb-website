import Reveal from './Reveal';
import { TRADES } from '@/lib/trades';

const SERVICES = [
  ['01', '舊屋翻新', '從拆除、水電、泥作、防水、木作到整體空間重塑，協助客戶兼顧美感、預算與長期使用安全，重新定義老屋的生活可能性。'],
  ['02', '商業空間', '整合商業空間的設計規劃、工程發包與施工管理，協助打造符合品牌形象與動線需求的專業空間環境。'],
  ['03', '新成屋裝修', '新成屋交屋後的全室規劃，包含風格定位、收納設計、材料建議、預算配置與工程安排，從空屋到可以入住的家。'],
  ['04', '預售屋客變', '協助釐清未來入住需求，提前進行格局、動線、插座、燈位、收納規劃，讓你在交屋前就把重要決策想清楚。'],
  ['05', '工程發包管理', '具備完整的工程協調與管理機制，包含報價整合、工班安排、進度追蹤、施工節點控管。你不需要自己追著每一個工種跑。'],
  ['06', '完工驗收與售後', '我們重視完工，更重視完工之後。交屋後仍持續提供修繕、使用問題回覆與售後支援，讓服務不在完工那天中止。'],
];

export default function Services() {
  return (
    <section id="services">
      <div className="services-head">
        <div>
          <Reveal className="eyebrow"><span className="eyebrow-text">Services</span></Reveal>
          <Reveal><h2 className="section-title">從規劃到驗收，<br />整合你需要的每一環</h2></Reveal>
        </div>
        <Reveal>
          <p className="section-body" style={{ fontSize: '0.88rem' }}>
            不是只畫圖，也不是只施工。而是從需求、預算、設計、工程到驗收，為你整合成一套完整服務。
          </p>
        </Reveal>
      </div>

      <div className="services-grid">
        {SERVICES.map(([num, title, desc], i) => (
          <Reveal className="service-card" key={num} delay={(i % 3) * 0.08}>
            <div className="service-num">{num}</div>
            <div className="service-title">{title}</div>
            <p className="service-desc">{desc}</p>
            <span className="service-tag">→ 了解更多</span>
          </Reveal>
        ))}
      </div>

      <div className="trades">
        <Reveal className="trades-head">
          <div className="eyebrow"><span className="eyebrow-text">Trades</span></div>
          <h3 className="trades-title">工程項目</h3>
          <p className="section-body" style={{ fontSize: '0.88rem' }}>
            全室裝修涉及的各項工程，由統包先生統一發包、排程與現場管理。你只需要面對一個窗口。
          </p>
        </Reveal>
        <div className="trades-grid">
          {TRADES.map(([title, desc], i) => (
            <Reveal className="trade-item" key={title} delay={(i % 5) * 0.05}>
              <h4 className="trade-title">{title}</h4>
              <p className="trade-desc">{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
