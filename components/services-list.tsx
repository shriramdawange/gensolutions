import Link from "next/link";
import { services } from "@/lib/site-data";

export default function ServicesList() {
  return (
    <section className="k-section" id="capabilities">
      <div className="k-wrap">
        <div className="k-services-head">
          <div>
            <div className="k-eyebrow">02 / What we do</div>
            <h2 className="k-h2">
              Built at the edge of <span className="k-display k-green">what&rsquo;s possible.</span>
            </h2>
          </div>
          <p>From first principles to production-minded engineering, we help turn complex ideas into practical systems.</p>
        </div>
        <div className="k-service-list">
          {services.map((s) => (
            <Link className="k-service" href={`/capabilities#${s.slug}`} key={s.slug}>
              <span className="k-service-num">{s.n}</span>
              <span className="k-service-title">{s.title}</span>
              <span className="k-service-copy">{s.copy}</span>
              <span className="k-service-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "3rem" }}>
          <Link className="k-btn" href="/capabilities">
            Explore capabilities <span className="k-btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
