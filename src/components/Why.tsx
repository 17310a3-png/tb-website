import Reveal from './Reveal';

const ITEMS = [
  ['01', '顧問式接洽', '我們不是急著成交，而是先幫你釐清需求、預算與適合的做法。好的合作，從真正的理解開始。'],
  ['02', '設計與工程真正整合', '很多問題不是設計不好看，而是設計與施工沒有真正接起來。統包先生重視的，是從圖面到現場都能被執行。'],
  ['03', '制度化管理', '裝修品質不依賴單一個人，而是依靠明確流程、團隊分工與管理標準。制度是我們給你最好的承諾。'],
  ['04', '多門市服務體系', '從總部到各門市，持續建立可複製的服務系統，讓品牌成長的同時，品質也能穩定延續。'],
  ['05', '長期關係，不只一次合作', '裝修不是一次交易，而是一段長期關係的開始。成為你一輩子的裝修顧問，是我們真正的目標。'],
];

export default function Why() {
  return (
    <section id="why">
      <div className="why-layout">
        <Reveal className="why-list">
          <div className="eyebrow" style={{ marginBottom: 32 }}><span className="eyebrow-text">Why Us</span></div>
          <div className="section-title" style={{ marginBottom: 48 }}>裝修的安心感，<br />來自每個細節<br />都有人接住</div>
          {ITEMS.map(([num, title, desc]) => (
            <div className="why-item" key={num}>
              <div className="why-num">{num}</div>
              <div>
                <div className="why-item-title">{title}</div>
                <p className="why-item-desc">{desc}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="why-right">
          <div className="why-brand-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo/mark-black.png" alt="統包先生" className="why-brand-logo" width={300} height={300} loading="lazy" />
            <div className="why-brand-title">把複雜交給我們，<br />把安心留給你。</div>
            <p className="why-brand-sub">
              統包先生希望成為全台最值得信任的連鎖室內裝修品牌，讓每一位客戶在有裝修需求時，第一個想到的，就是統包先生。
            </p>
          </div>
          <div className="why-vision">
            <div className="why-vision-label">Brand Mission</div>
            <p className="why-vision-text">
              用透明流程、專業分工與顧問式服務，把複雜的裝修，變成更清楚、更安心的體驗。裝修這件事，應該有人真正負責。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
