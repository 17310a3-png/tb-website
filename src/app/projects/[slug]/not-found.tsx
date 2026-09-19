import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ProjectNotFound() {
  return (
    <>
      <Nav />
      <main className="pp" style={{ minHeight: '60vh' }}>
        <header className="pp-head">
          <div className="eyebrow"><span className="eyebrow-text">404</span></div>
          <h1 className="pp-title">找不到這個案例</h1>
          <p className="pp-meta">可能已下架，或網址打錯了。</p>
          <a href="/#portfolio" className="btn-yellow" style={{ marginTop: 24, display: 'inline-block' }}>回作品案例</a>
        </header>
      </main>
      <Footer />
    </>
  );
}
