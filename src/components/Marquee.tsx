const PHRASES = [
  '統包先生，讓裝修變得更清楚',
  '把複雜交給我們，把安心留給你',
  '裝修這件事，應該有人真正負責',
  '有制度的裝修，才有安心的交付',
  '不只完成空間，更完成信任',
  '舊屋翻新｜商業空間｜室內裝修',
];

export default function Marquee() {
  // 重複兩份讓動畫無縫接合
  const items = [...PHRASES, ...PHRASES];
  return (
    <div id="marquee-section">
      <div className="marquee-track">
        {items.map((p, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-dot" />
            <span>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
