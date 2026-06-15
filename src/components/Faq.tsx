'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const FAQS = [
  ['你們主要接哪些類型的案件？', '我們以住宅裝修為主，包含舊屋翻新、商業空間、室內裝修、預售屋客變等，也會依實際需求評估案件內容與適合的服務方式。'],
  ['可以只做設計，或只做工程嗎？', '可依案件狀況評估。但統包先生最核心的優勢在於設計與工程整合管理，若希望整體成果與溝通效率更穩定，建議採整合式服務。'],
  ['第一次諮詢可以談什麼？', '可以先談房屋現況、預算範圍、家庭需求、喜歡的風格方向，以及你目前最在意的問題。我們會協助你把想法整理得更清楚。'],
  ['裝修預算怎麼抓比較合理？', '預算會依坪數、屋況、工程範圍、材料等級與需求完整度而不同。建議先預約諮詢，讓我們依照你的條件給出較具體的建議範圍。'],
  ['施工過程會有人追蹤進度嗎？', '會。統包先生重視施工管理與節點追蹤，由相關負責人持續掌握進度與現場狀況，降低溝通斷點，讓你不必自己追著工班跑。'],
  ['完工之後還有售後服務嗎？', '有。我們希望成為客戶長期的裝修顧問，完工後仍提供後續修繕與使用問題協助，服務不在完工那天中止。'],
  ['如何預約諮詢？', '你可以透過網站表單、官方 LINE、電話或到店預約，我們會安排合適的接洽方式。填寫下方表單是最直接的方式。'],
];

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
              <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{q}</span>
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-a">
                <div className="faq-a-inner">{a}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
