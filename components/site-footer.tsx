export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-main">
        <a href="/" className="brand footer-brand">
          <span className="brand-mark">G<span>.</span></span>
          <span className="brand-text">GenSolutions<small>GENERATIVE SOLUTIONS</small></span>
        </a>
        <p>We generate solutions,<br />not just software.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/capabilities">Capabilities</a>
          <a href="/work">Products</a>
          <a href="/team">Team</a>
          <a href="/approach">Approach</a>
          <a href="/#careers">Careers</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>© {new Date().getFullYear()} GenSolutions. Built with intent.</span>
        <span className="mono">{"< GENERATIVE_SOLUTIONS />"}</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
