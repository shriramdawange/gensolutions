import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import StartProjectClient from "@/components/start-project-client";

export const metadata: Metadata = { title: "Start a Project" };

export default function StartProjectPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "START A PROJECT" }]}
          eyebrow="Project brief"
          title={
            <>
              Start with a brief.
              <br />
              <span className="k-display">Leave with a plan.</span>
            </>
          }
          lead="Three quick steps. No calls required, no decks needed — just the problem as you see it. We take it from there."
        />
        <section className="k-block">
          <div className="k-wrap">
            <StartProjectClient />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
