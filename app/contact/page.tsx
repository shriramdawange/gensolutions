import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><span>CONTACT</span></div>
          <h1>Send an<br /><span className="gradient-text">enquiry.</span></h1>
          <p>One form, zero friction. Tell us what you are working on — AI, product, R&amp;D or engineering — and we reply within 2 working days.</p>
        </div>
        <section className="contact-section" style={{ borderTop: 0 }}>
          <div className="section-wrap contact-layout">
            <div className="contact-intro">
              <div className="section-kicker"><span>GS</span> / DIRECT LINES</div>
              <h2>Talk to<br />a <span className="gradient-text">human.</span></h2>
              <p>No ticket queues. Your note lands directly with the people who will scope and build the work.</p>
              <div className="contact-direct"><span className="contact-direct-icon">↗</span><div><span className="muted-text small-label">EMAIL US DIRECTLY</span><a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a></div></div>
              <div className="contact-direct"><span className="contact-direct-icon">◷</span><div><span className="muted-text small-label">RESPONSE TIME</span><span>Within 2 working days.</span></div></div>
              <a className="know-more quiet" href="/start-project">Prefer the guided brief? <span>→</span></a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
