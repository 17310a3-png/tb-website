const STATS = [
  ['4', '服務門市據點'],
  ['3', '核心服務領域'],
  ['8', '完整服務流程'],
  ['100%', '住宅裝修專注'],
  ['∞', '售後延續服務'],
];

export default function NumbersStrip() {
  return (
    <div id="strip">
      <div className="strip-inner">
        {STATS.map(([num, label], i) => (
          <div className="strip-item" key={i}>
            <span className="strip-num">{num}</span>
            <span className="strip-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
