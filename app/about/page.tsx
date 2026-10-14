import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>ABOUT</span></div>
          <h1>Curiosity is the<br />starting point. <span className="muted-text">Impact is the goal.</span></h1>
          <p>GenSolutions is an engineering and innovation company at the intersection of AI, research and product development. Builder mindset, evidence standard.</p>
        </div>
        <section className="section-wrap intro-section" style={{ paddingTop: 60 }}>
          <div className="intro-layout">
            <h2>Know more<br />about <span className="gradient-text">GenSolutions.</span></h2>
            <div className="intro-copy">
              <p className="large-copy">We research, engineer and build intelligent products that turn complex challenges into real-world outcomes.</p>
              <p>Client engagements, internal R&amp;D and products with purpose — ZeroBite for food, AIRLANCE for medical logistics, VAYU-SENTINEL for air quality. Small team, big questions, documented work.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="know-more" href="/team">Know more — the team <span>→</span></a>
                <a className="know-more quiet" href="/work">See the work <span>↗</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
