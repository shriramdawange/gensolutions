import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import TeamSection from "@/components/team-section";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "TEAM" }]}
          eyebrow="The bench"
          title={
            <>
              Small team.
              <br />
              <span className="k-display">Serious bench.</span>
            </>
          }
          lead="Four people covering engineering, design and operations. Curiosity first, titles second — everyone ships, everyone measures."
        />
        <TeamSection />
        <section className="k-block">
          <div className="k-wrap">
            <div className="k-hero-actions" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div className="k-eyebrow">Open door</div>
                <h2 className="k-block-title" style={{ marginTop: "0.75rem" }}>
                  Build <span className="k-display">with us.</span>
                </h2>
              </div>
              <a className="k-btn k-btn--solid" href="mailto:hello.gensolutions@gmail.com?subject=Joining%20GenSolutions">
                Introduce yourself <span className="k-btn-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
