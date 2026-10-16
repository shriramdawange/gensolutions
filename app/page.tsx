import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import AboutReveal from "@/components/about-reveal";
import MediaBand from "@/components/media-band";
import Metrics from "@/components/metrics";
import ServicesList from "@/components/services-list";
import WorksGrid from "@/components/works-grid";
import CtaBand from "@/components/cta-band";
import QuoteBand from "@/components/quote-band";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Marquee
          items={["AI & Intelligence", "Engineering", "Research & Development", "Product Innovation"]}
          duration={32}
        />
        <AboutReveal />
        <MediaBand />
        <Metrics />
        <ServicesList />
        <WorksGrid />
        <CtaBand />
        <QuoteBand />
      </main>
      <SiteFooter />
    </>
  );
}
