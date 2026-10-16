import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "CONTACT" }]}
          eyebrow="Direct lines"
          title={
            <>
              Send an
              <br />
              <span className="k-display">enquiry.</span>
            </>
          }
          lead="One form, zero friction. Tell us what you are working on — AI, product, R&D or engineering — and we reply within 2 working days."
        />
        <section className="k-block">
          <div className="k-wrap">
            <div className="k-contact-grid">
              <InView className="k-rv k-contact-intro">
                <h2>
                  Talk to
                  <br />a <span className="k-display">human.</span>
                </h2>
                <p className="k-lead" style={{ marginInline: 0 }}>
                  No ticket queues. Your note lands directly with the people who will scope and build the work.
                </p>
                <div>
                  <div className="k-direct">
                    <span className="k-direct-icon">↗</span>
                    <div>
                      <span className="k-label">Email us directly</span>
                      <a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a>
                    </div>
                  </div>
                  <div className="k-direct">
                    <span className="k-direct-icon">◷</span>
                    <div>
                      <span className="k-label">Response time</span>
                      <strong>Within 2 working days.</strong>
                    </div>
                  </div>
                </div>
                <Link className="k-btn" href="/start-project">
                  Prefer the guided brief? <span className="k-btn-arrow">→</span>
                </Link>
              </InView>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
