import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";
import { process } from "@/lib/site-data";

export const metadata: Metadata = { title: "Approach" };

export default function ApproachPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "APPROACH" }]}
          eyebrow="How we work"
          title={
            <>
              Less theatre.
              <br />
              <span className="k-display">More engineering.</span>
            </>
          }
          lead="Four steps, no shortcuts. Every engagement ends with something measured — a pilot result, a prototype eval, or a documented no-go."
        />
        <section className="k-block">
          <div className="k-wrap">
            <InView className="k-rv">
              <div className="k-steps">
                {process.map(([n, title, copy]) => (
                  <article className="k-step" key={n}>
                    <div className="k-step-num">{n}</div>
                    <div className="k-step-line" />
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </InView>
            <div className="k-hero-actions" style={{ marginTop: "3rem" }}>
              <Link className="k-btn" href="/contact">
                Start with step 01 <span className="k-btn-arrow">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
