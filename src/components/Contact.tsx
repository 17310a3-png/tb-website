import Reveal from './Reveal';

const SURVEYCAKE_URL = process.env.NEXT_PUBLIC_SURVEYCAKE_URL || 'https://www.surveycake.com/s/Ad81e';
const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || '';

export default function Contact() {
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
          {LINE_URL && (
            <a className="contact-line-cta" href={LINE_URL} target="_blank" rel="noopener noreferrer">
              <div className="line-icon">💬</div>
              <div className="contact-line-cta-text">
                <h4>加入官方 LINE 立即洽詢</h4>
                <p>最快速的諮詢方式，回覆迅速</p>
              </div>
              <div className="line-arrow">›</div>
            </a>
          )}
        </Reveal>

        <Reveal as="div">
          <div className="contact-survey">
            <div className="form-label" style={{ marginBottom: 14 }}>線上預約表單</div>
            <h3 className="contact-survey-title">填寫預約諮詢表單</h3>
            <p className="contact-survey-desc">
              留下你的房屋條件與需求，我們會安排合適的顧問與你聯繫，依照你的條件提供更具體的規劃建議。只需要幾分鐘。
            </p>
            <ul className="contact-survey-list">
              <li>房屋類型、坪數與所在地</li>
              <li>預算範圍與想優先解決的問題</li>
              <li>專人回覆、不需自己追進度</li>
            </ul>
            <a className="btn-yellow contact-survey-btn" href={SURVEYCAKE_URL} target="_blank" rel="noopener noreferrer">
              前往預約諮詢表單 →
            </a>
            <p className="contact-survey-note">點擊後將開啟線上表單（SurveyCake），填寫完成即送出。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
