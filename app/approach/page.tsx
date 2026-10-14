import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { process } from "@/lib/site-data";

export const metadata: Metadata = { title: "Approach" };

export default function ApproachPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>APPROACH</span></div>
          <h1>Less theatre.<br /><span className="muted-text">More engineering.</span></h1>
          <p>Four steps, no shortcuts. Every engagement ends with something measured — a pilot result, a prototype eval, or a documented no-go.</p>
          <a className="know-more" href="/#contact">Start with step 01 <span>↗</span></a>
        </div>
        <section className="section-wrap process-section" style={{ paddingTop: 60 }}>
          <div className="process-grid" style={{ marginTop: 0 }}>
            {process.map(([n, title, copy]) => (
              <article className="process-step" key={n}>
                <div className="process-number">{n}</div>
                <div className="process-line" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
