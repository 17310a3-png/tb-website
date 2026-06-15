const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || '';

export default function FloatCta() {
  return (
    <div className="float-cta">
      <a href="#contact" className="float-consult">立即預約諮詢</a>
      {LINE_URL && (
        <a className="float-line" href={LINE_URL} target="_blank" rel="noopener noreferrer" title="加入官方LINE" style={{ textDecoration: 'none' }}>💬</a>
      )}
    </div>
  );
}
