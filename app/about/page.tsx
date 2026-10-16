import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "ABOUT" }]}
          eyebrow="About GenSolutions"
          title={
            <>
              Curiosity is the
              <br />
              <span className="k-display">starting point.</span>
            </>
          }
          lead="GenSolutions is an engineering and innovation company at the intersection of AI, research and product development. Builder mindset, evidence standard."
        />
        <section className="k-block">
          <div className="k-wrap">
            <div className="k-split">
              <InView className="k-rv">
                <h2 className="k-block-title" style={{ marginTop: 0 }}>
                  <span className="k-mask">
                    <span>
                      Know more about <span className="k-display">GenSolutions.</span>
                    </span>
                  </span>
                </h2>
              </InView>
              <div className="k-prose">
                <p className="k-prose-lead">
                  We research, engineer and build intelligent products that turn complex challenges into real-world outcomes.
                </p>
                <p>
                  Client engagements, internal R&amp;D and products with purpose — ZeroBite for food, AIRLANCE for medical
                  logistics, VAYU-SENTINEL for air quality. Small team, big questions, documented work.
                </p>
                <div className="k-hero-actions" style={{ marginTop: "0.5rem" }}>
                  <Link className="k-btn" href="/team">
                    Know more — the team <span className="k-btn-arrow">→</span>
                  </Link>
                  <Link className="k-btn" href="/work">
                    See the work <span className="k-btn-arrow">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
