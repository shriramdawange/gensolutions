import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StartProjectClient from "@/components/start-project-client";

export const metadata: Metadata = { title: "Start a Project" };

export default function StartProjectPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>START A PROJECT</span></div>
          <h1>Start with a brief.<br /><span className="gradient-text">Leave with a plan.</span></h1>
          <p>Three quick steps. No calls required, no decks needed — just the problem as you see it. We take it from there.</p>
        </div>
        <section className="section-wrap" style={{ padding: "46px 0 90px" }}>
          <StartProjectClient />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
