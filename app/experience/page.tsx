import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ParticleWave from "@/components/particle-wave";

export const metadata: Metadata = { title: "Experience" };

const stages = [
  { id: "A", label: "DISCOVER" },
  { id: "B", label: "RESEARCH" },
  { id: "C", label: "ENGINEER" },
  { id: "D", label: "VALIDATE" },
  { id: "E", label: "BUILD" },
  { id: "F", label: "ITERATE" },
  { id: "G", label: "DEPLOY" },
  { id: "H", label: "EVOLVE" },
];

export default function ExperiencePage() {
  return (
    <>
      <SiteHeader />
      <main className="gs-experience" id="top">
        <ParticleWave />

        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>EXPERIENCE</span></div>
          <div className="section-kicker" style={{ marginTop: 18 }}><span>G / 001</span> / INTELLIGENCE IN MOTION</div>
          <h1>We build<br /><span className="gradient-text">what&apos;s next.</span></h1>
          <p>Complex problems deserve more than ordinary answers. Research, engineering and intelligence — turned into meaningful solutions.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="know-more" href="/work">Explore our work <span>→</span></a>
            <a className="know-more quiet" href="/start-project">Start a project <span>↗</span></a>
          </div>
        </div>

        <div className="gs-exp-label label-left"><i /> INTELLIGENCE IN MOTION</div>
        <div className="gs-exp-label label-right"><i /> IDEAS INTO SYSTEMS</div>

        <section className="section-wrap gs-exp-stages-section" aria-label="How we get there">
          <div className="section-kicker"><span>PATH</span> / A — H</div>
          <div className="gs-exp-stages">
            {stages.map((stage, index) => (
              <a
                href="/approach"
                key={stage.id}
                className={index === 2 ? "active" : ""}
                aria-label={stage.label}
                title={stage.label}
              >
                {stage.id}
                <small>{stage.label}</small>
              </a>
            ))}
          </div>
          <div className="gs-exp-signal">
            <span>GEN / SYSTEMS</span>
            <div className="signal-track"><i /><i /><i /><i /><i /></div>
            <span className="signal-value">GS</span>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
