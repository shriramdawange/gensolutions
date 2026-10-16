import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";
import { services } from "@/lib/site-data";

export const metadata: Metadata = { title: "Capabilities" };

export default function CapabilitiesPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "CAPABILITIES" }]}
          eyebrow="What we do"
          title={
            <>
              Built at the edge
              <br />
              of <span className="k-display">what is possible.</span>
            </>
          }
          lead="Four capabilities, one bar: evidence over theatre. Each one ships with evals, docs and a handoff you can run without us."
        />
        <section className="k-block">
          <div className="k-wrap">
            <div className="k-cards">
              {services.map((s) => (
                <article className="k-card" key={s.n}>
                  <div className="k-card-top">
                    <span className="k-card-num">{s.n} / CAPABILITY</span>
                    <span className="k-card-arrow">↗</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <ul className="k-list">
                    {s.detail.map((d, i) => (
                      <li key={d}>
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="k-tags">
                    {s.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <InView className="k-rv">
              <div className="k-hero-actions" style={{ marginTop: "3rem" }}>
                <Link className="k-btn" href="/approach">
                  Know more — how we work <span className="k-btn-arrow">→</span>
                </Link>
              </div>
            </InView>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
