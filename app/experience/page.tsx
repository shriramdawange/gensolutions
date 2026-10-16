import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
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
  { id: "H", label: "EVOLVE" }
];

export default function ExperiencePage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          background={
            <div className="k-wave">
              <ParticleWave />
            </div>
          }
          crumbs={[{ label: "HOME", href: "/" }, { label: "EXPERIENCE" }]}
          eyebrow={<span>G / 001 · Intelligence in motion</span>}
          title={
            <>
              We build
              <br />
              <span className="k-display">what&apos;s next.</span>
            </>
          }
          lead="Complex problems deserve more than ordinary answers. Research, engineering and intelligence — turned into meaningful solutions."
          actions={
            <>
              <Link className="k-btn k-btn--solid" href="/work">
                Explore our work <span className="k-btn-arrow">→</span>
              </Link>
              <Link className="k-btn" href="/start-project">
                Start a project <span className="k-btn-arrow">↗</span>
              </Link>
            </>
          }
        />
        <section className="k-block">
          <div className="k-wrap">
            <div className="k-eyebrow" style={{ marginBottom: "1.5rem" }}>
              Path / A — H
            </div>
            <div className="k-stages">
              {stages.map((stage, index) => (
                <Link href="/approach" key={stage.id} className={`k-stage ${index === 2 ? "active" : ""}`} title={stage.label}>
                  <span>{stage.id}</span>
                  <small>{stage.label}</small>
                </Link>
              ))}
            </div>
            <div className="k-exp-meta">
              <span>GEN / SYSTEMS</span>
              <span className="k-signal" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>GS</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
