import Link from "next/link";
import WorksShowcase from "./works-showcase";

export default function WorksGrid() {
  return (
    <section className="k-works" id="work">
      <div className="k-wrap">
        <div className="k-works-head">
          <div>
            <div className="k-eyebrow">03 / Selected work</div>
            <h2 className="k-h2">
              Ideas becoming <span className="k-display k-green">something real.</span>
            </h2>
          </div>
          <p>A growing portfolio of product initiatives and applied research. Each begins with a problem worth solving.</p>
        </div>
        <WorksShowcase />
        <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <Link className="k-btn" href="/work">
            All projects <span className="k-btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
