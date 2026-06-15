import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about">
      <Reveal className="about-photos" y={0}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/about/main.jpg" loading="lazy" alt="統包先生完工實景空間" className="about-photo-main" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/about/sub.jpg" loading="lazy" alt="統包先生住宅裝修作品" className="about-photo-sub" />
        <div className="about-photo-caption">
          統包先生<br />品牌實績
        </div>
      </Reveal>

      <Reveal>
        <div className="eyebrow"><span className="eyebrow-text">About Us</span></div>
        <h2 className="section-title">我們相信，裝修不只是<br />完成空間</h2>
        <p className="section-body">
          統包先生是一個以住宅裝修為主軸的整合型品牌。我們服務的，不只是空間本身，更是客戶從收屋、規劃、施工到入住後的整體體驗。
          <br /><br />
          透過明確的顧問接洽流程、設計與工務分工、標準化施工管理與多門市服務系統，讓每一位客戶都能更清楚知道：現在進行到哪裡、接下來會發生什麼、每一筆預算花在哪裡。
        </p>
        <div className="about-values">
          {['誠信透明', '專業整合', '責任到位', '長期陪伴'].map((t) => (
            <div className="value-tag" key={t}>{t}</div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
