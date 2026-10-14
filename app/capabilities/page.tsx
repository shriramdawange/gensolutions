import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { services } from "@/lib/site-data";

export const metadata: Metadata = { title: "Capabilities" };

export default function CapabilitiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>CAPABILITIES</span></div>
          <h1>Built at the edge<br />of <span className="gradient-text">what is possible.</span></h1>
          <p>Four capabilities, one bar: evidence over theatre. Each one ships with evals, docs and a handoff you can run without us.</p>
          <a className="know-more" href="/#contact">Scope a capability <span>↗</span></a>
        </div>
        <section className="section-wrap services-section" style={{ paddingTop: 40 }}>
          <div className="service-grid">
            {services.map((s) => (
              <article className="service-card" key={s.n}>
                <div className="card-topline"><span className="mono">{s.n} / CAPABILITY</span><span className="card-arrow">↗</span></div>
                <h3 style={{ marginTop: 18 }}>{s.title}</h3>
                <p>{s.copy}</p>
                <ul className="check-list" style={{ marginTop: 16 }}>
                  {s.detail.map((d, i) => <li key={d}><b>{String(i + 1).padStart(2, "0")}</b>{d}</li>)}
                </ul>
                <div className="tag-row">{s.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <a className="know-more" href="/approach">Know more — how we work <span>→</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
