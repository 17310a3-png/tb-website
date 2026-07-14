const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || '';

export default function FloatCta() {
  return (
    <div className="float-cta">
      <a href="#contact" className="float-consult">立即預約諮詢</a>
      {LINE_URL && (
        <a className="float-line" href={LINE_URL} target="_blank" rel="noopener noreferrer" title="加入官方LINE" aria-label="加入官方 LINE" style={{ textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" focusable="false">
            <path d="M12 3C6.477 3 2 6.847 2 11.594c0 2.73 1.487 5.16 3.797 6.73-.09.85-.395 2.087-1.006 3.02-.16.245.05.56.335.49 1.9-.46 3.42-1.34 4.376-2.03.8.157 1.636.24 2.498.24 5.523 0 10-3.846 10-8.593S17.523 3 12 3z" />
          </svg>
        </a>
      )}
    </div>
  );
}
