import Reveal from './Reveal';
import { STORES } from '@/lib/stores';

/** 關於我們＋為何選擇 合併成一區（2026-10-03，老師回饋兩區內容重複）。
 *  左：團隊照片；右：公司是做什麼的（事實）＋ 我們怎麼做事（原 Why 的 5 點，去掉口號）。 */
const HOW = [
  ['先聽需求，再談做法', '第一次見面不談成交，先弄清楚屋況、預算和你最在意的事，再給建議。'],
  ['設計和施工同一個團隊', '畫圖的人知道現場怎麼做，施工的人看得懂圖，圖面到現場不會接不起來。'],
  ['靠制度，不靠某一個人', '流程、分工、節點驗收都有標準，案子不會因為換了負責人就走樣。'],
  ['一個窗口對到底', '水電、木作、泥作、廚具、衛浴由我們發包和排程，你不用自己追工班。'],
  ['完工後還找得到人', '交屋後的修繕、使用問題照樣處理，客戶大多是住了幾年再回來找我們做第二間。'],
];

export default function About() {
  return (
    <section id="about">
      <Reveal className="about-photos" y={0}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/about/main.jpg" loading="lazy" width={1500} height={1001} alt="統包先生施工團隊形象合照" className="about-photo-main" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/about/sub.jpg" loading="lazy" width={1000} height={667} alt="統包先生住宅裝修作品" className="about-photo-sub" />
        <div className="about-photo-caption">
          統包先生<br />核心團隊
        </div>
      </Reveal>

      <Reveal>
        <div className="eyebrow"><span className="eyebrow-text">About Us</span></div>
        <h2 className="section-title">住宅全室裝修統包</h2>
        <p className="section-body">
          統包先生做住宅全室裝修：新成屋、舊屋翻新、預售屋客變，也接商業空間。從設計、報價、發包到施工管理，由同一個團隊負責到完工交屋。
          目前 {STORES.length} 間門市，服務雙北、桃園、新竹、台中。
        </p>

        <div className="about-how">
          <div className="about-how-title">我們怎麼做事</div>
          {HOW.map(([title, desc], i) => (
            <div className="why-item" key={title}>
              <div className="why-num">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="why-item-title">{title}</div>
                <p className="why-item-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
