import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import WorksShowcase from "@/components/works-showcase";

export const metadata: Metadata = { title: "Projects" };

export default function WorkPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "PROJECTS" }]}
          eyebrow="Selected work"
          title={
            <>
              Ideas becoming
              <br />
              <span className="k-display">something real.</span>
            </>
          }
          lead="Three bets in motion — food redistribution, medical logistics and environmental intelligence. Each page shows the problem, the approach and what is next."
        />
        <section className="k-block" id="work">
          <div className="k-wrap">
            <WorksShowcase />
            <p className="k-note" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
              Portfolio note: status is shown transparently; inclusion here does not imply public launch or commercial
              availability. Illustrative imagery via Wikimedia Commons (CC).
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
