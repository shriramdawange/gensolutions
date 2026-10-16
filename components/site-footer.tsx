import Link from "next/link";
import InView from "./in-view";

const links: [string, string][] = [
  ["About", "/about"],
  ["Capabilities", "/capabilities"],
  ["Work", "/work"],
  ["Team", "/team"],
  ["Contact", "/contact"]
];

export default function SiteFooter() {
  return (
    <footer className="k-footer">
      <div className="k-wrap">
        <InView className="k-rv" threshold={0.3}>
          <h2 className="k-footer-title">
            <span className="k-mask">
              <span>
                We generate <span className="k-display">solutions,</span>
              </span>
            </span>
            <span className="k-mask">
              <span style={{ transitionDelay: "0.1s" }}>not just software.</span>
            </span>
          </h2>
        </InView>

        <div className="k-footer-main">
          <div className="k-footer-cta">
            <div className="k-eyebrow">Start a conversation</div>
            <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a>
            <nav className="k-footer-links" aria-label="Footer">
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="k-footer-social">
            <a href="mailto:hello.gensolutions@gmail.com">
              <small>Email</small>
              <strong>hello.gensolutions@gmail.com</strong>
            </a>
            <Link href="/start-project">
              <small>Projects</small>
              <strong>Start a project</strong>
            </Link>
            <Link href="/work">
              <small>Portfolio</small>
              <strong>Selected work</strong>
            </Link>
          </div>
        </div>

        <div className="k-footer-bottom">
          <span>© {new Date().getFullYear()} GenSolutions. Built with intent.</span>
          <span className="k-muted">{"< GENERATIVE_SOLUTIONS />"}</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
