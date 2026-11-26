import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import TeamSection from "@/components/team-section";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>TEAM</span></div>
          <h1>Small team.<br /><span className="gradient-text">Serious bench.</span></h1>
          <p>A concise record of the two founding-member profiles we are retaining on the public site.</p>
          <a className="know-more" href="/careers">Explore open roles <span>↗</span></a>
        </div>
        <TeamSection />
        <div className="section-wrap subpage-cta">
          <div><div className="section-kicker"><span>JOIN</span> / OPEN DOOR</div><h2>Build with us.</h2></div>
          <a className="know-more" href="/careers">View open positions <span>↗</span></a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
