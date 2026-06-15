import Reveal from './Reveal';

const STEPS = [
  ['01', '初步諮詢', '了解房屋條件、預算範圍、需求重點與入住目標，建立第一階段方向。'],
  ['02', '現場丈量', '安排現場丈量，掌握空間尺寸、基礎條件與施工限制，讓後續規劃建立在正確資訊上。'],
  ['03', '需求梳理規劃', '依照家庭成員、使用習慣、收納需求，整理出適合的動線與空間配置。'],
  ['04', '報價方案確認', '提出設計方向、工程內容與預算規劃，讓你清楚知道做什麼、怎麼做、預算如何分配。'],
  ['05', '簽約排程', '確認合作後，安排正式時程、工種銜接與材料準備，正式進入施工執行。'],
  ['06', '施工進度追蹤', '由團隊持續追蹤現場施工品質、進度與各項協調事項，降低溝通斷點。'],
  ['07', '完工驗收交付', '完工後進行驗收確認，協助客戶掌握空間成果與後續使用注意事項。'],
  ['08', '售後延續服務', '入住後若有維護、修繕需求，統包先生持續作為你的裝修顧問，提供後續協助。'],
];

export default function Process() {
  return (
    <section id="process">
      <div className="process-bg-word">FLOW</div>
      <Reveal className="process-head">
        <div className="eyebrow"><span className="eyebrow-text">Our Process</span></div>
        <h2 className="section-title">好的裝修，過程一樣清楚</h2>
        <p className="section-body" style={{ margin: '0 auto', textAlign: 'center' }}>
          每一個節點都有明確的負責人與進度確認，讓你在整個過程中不需要猜測，只需要安心。
        </p>
      </Reveal>

      <div className="process-grid">
        {STEPS.map(([num, title, desc], i) => {
          const last = i === STEPS.length - 1;
          return (
            <Reveal
              className={`process-card${last ? ' highlight' : ''}`}
              key={num}
              delay={(i % 4) * 0.07}
            >
              <div className="process-card-line" style={last ? { background: 'var(--yellow)' } : undefined} />
              <div className="process-card-num" style={last ? { color: 'var(--yellow)' } : undefined}>{num}</div>
              <div className="process-card-title" style={last ? { color: 'var(--yellow)' } : undefined}>{title}</div>
              <p className="process-card-desc">{desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
