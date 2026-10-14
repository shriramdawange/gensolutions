import SiteHeader from "@/components/site-header";
import ContactForm from "@/components/contact-form";
import MovingGrid from "@/components/ui/hyper-grid";
import HeroGsap from "@/components/hero-gsap";
import Personality from "@/components/personality";
import ScrollSection from "@/components/scroll-section";
import TeamSection from "@/components/team-section";

const services = [
  { n: "01", title: "AI & Intelligence", copy: "AI agents, retrieval systems, intelligent workflows and applied machine learning designed around real problems.", tags: ["Agentic AI", "RAG systems", "Applied ML"] },
  { n: "02", title: "Engineering", copy: "Reliable digital products and platforms—from early architecture through implementation, integration and deployment.", tags: ["Web platforms", "APIs", "Cloud systems"] },
  { n: "03", title: "Research & Development", copy: "Explore difficult questions, validate ideas with experiments and turn promising research into working systems.", tags: ["Prototyping", "Evaluation", "Technical research"] },
  { n: "04", title: "Product Innovation", copy: "Build products with a clear purpose, a practical roadmap and room to evolve as real users teach us more.", tags: ["Product strategy", "MVPs", "Iteration"] }
];

const products = [
  {
    slug: "zerobite",
    code: "GS / 001",
    name: "ZeroBite",
    type: "FOOD REDISTRIBUTION · SOCIAL IMPACT",
    desc: "Save Food. Share Hope. Surplus food routed to communities through verified partners — safe, coordinated, measurable.",
    mark: "Z",
    className: "zero",
    status: "Restart / discovery — MVP planning",
    tags: ["Food rescue", "NGOs", "Supabase"]
  },
  {
    slug: "airlance",
    code: "GS / 002",
    name: "AIRLANCE",
    type: "MEDICAL LOGISTICS",
    desc: "A product initiative focused on making medical logistics more coordinated, responsive and dependable.",
    mark: "A",
    className: "air",
    status: "Product initiative",
    tags: ["Healthcare", "Logistics", "Coordination"]
  },
  {
    slug: "vayu-sentinel",
    code: "GS / 003",
    name: "VAYU-SENTINEL",
    type: "DELHI-NCR AIR-QUALITY FORECASTING",
    desc: "Physics-informed, weather-coupled PM2.5 forecasting — hourly T+1 through T+72 with honest uncertainty.",
    mark: "V",
    className: "vayu",
    status: "Research prototype — validating",
    tags: ["PM2.5", "Python", "FastAPI"]
  }
];

const process = [
  ["01", "Understand", "Define the problem, the people affected and what success should look like."],
  ["02", "Research", "Test assumptions, explore constraints and choose an approach with evidence."],
  ["03", "Engineer", "Build the smallest robust solution that can be evaluated in the real world."],
  ["04", "Validate", "Measure, improve and prepare the solution for responsible deployment."]
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section id="home" className="relative">
          <MovingGrid gridSize={110} scrollSpeed={0.35} maskRadius={520} className="min-h-[96vh]">
            <div className="section-wrap" style={{ paddingTop: 8 }}>
              <HeroGsap />
            </div>
          </MovingGrid>
        </section>

        <section className="ticker" aria-label="Our focus areas">
          <div className="ticker-track">
            {[0, 1].map((half) => (
              <div className="ticker-group" key={half} aria-hidden={half === 1}>
                {["AI & INTELLIGENCE", "ENGINEERING", "RESEARCH & DEVELOPMENT", "PRODUCTS"].map((item) => (
                  <span key={item}>{item}<b>✳</b></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <Personality />

        <section className="section-wrap intro-section" id="about">
          <div className="section-kicker"><span>01</span> / WHO WE ARE</div>
          <div className="intro-layout">
            <h2>Curiosity is the<br />starting point.<br /><span className="muted-text">Impact is the goal.</span></h2>
            <div className="intro-copy">
              <p className="large-copy">GenSolutions is an engineering and innovation company working at the intersection of AI, research and product development.</p>
              <p>We bring a builder’s mindset to hard problems: understand the context, challenge assumptions, engineer carefully and validate what we create. Our work spans client engagements, internal R&D and products with a purpose.</p>
              <a className="text-link" href="#approach">How we work <span>↘</span></a>
              <br /><a className="know-more" href="/about">Know more about us <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="section-wrap services-section" id="capabilities">
          <div className="section-heading">
            <div><div className="section-kicker"><span>02</span> / WHAT WE DO</div><h2>Built at the edge<br />of <span className="gradient-text">what’s possible.</span></h2></div>
            <p>From first principles to production-minded engineering, we help turn complex ideas into practical systems.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.n}>
                <div className="card-topline"><span className="mono">{service.n} / CAPABILITY</span><span className="card-arrow">↗</span></div>
                <div className="service-icon" aria-hidden="true">{service.n === "01" ? "⌘" : service.n === "02" ? "⌬" : service.n === "03" ? "⟡" : "◈"}</div>
                <h3>{service.title}</h3><p>{service.copy}</p>
                <div className="tag-row">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <a className="know-more" href="/capabilities">Know more about capabilities <span>→</span></a>
        </section>

        <section className="work-section" id="work">
          <div className="section-wrap">
            <div className="section-heading work-heading">
              <div><div className="section-kicker"><span>03</span> / SELECTED WORK</div><h2>Ideas becoming<br /><span className="gradient-text">something real.</span></h2></div>
              <p>A growing portfolio of product initiatives and applied research. Each begins with a problem worth solving.</p>
            </div>
            <div className="product-list">
              {products.map((product, i) => (
                <article className={`product-card ${product.className}`} key={product.name}>
                  <div className="product-visual">
                    <div className="product-visual-grid" />
                    <div className="product-symbol">{product.mark}<span /></div>
                    <span className="product-index mono">{product.code}</span>
                    <span className="product-orbit orbit-a" /><span className="product-orbit orbit-b" />
                  </div>
                  <div className="product-info">
                    <div className="product-type">{product.type}</div>
                    <h3>{product.name}<span className="product-period">.</span></h3>
                    <p>{product.desc}</p>
                    <div className="tag-row">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                    <div className="product-bottom"><span className="status-pill"><i />{product.status}</span><span style={{ display: "flex", gap: 16 }}><a href={`/work/${product.slug}`} aria-label={`Know more about ${product.name}`}>Know more about it <span>→</span></a><a href="#contact" aria-label={`Enquire about ${product.name}`}>Discuss <span>↗</span></a></span></div>
                  </div>
                </article>
              ))}
            </div>
            <p className="portfolio-note">Portfolio note: product status is shown transparently; inclusion here does not imply public launch or commercial availability.</p>
            <a className="know-more" href="/work">Know more — all projects <span>→</span></a>
          </div>
        </section>

        <ScrollSection />

        <section className="section-wrap process-section" id="approach">
          <div className="section-heading">
            <div><div className="section-kicker"><span>04</span> / OUR APPROACH</div><h2>Less theatre.<br /><span className="muted-text">More engineering.</span></h2></div>
            <p>Good work is a process, not a reveal. We make the path from idea to impact deliberate and measurable.</p>
          </div>
          <div className="process-grid">
            {process.map(([n, title, copy]) => <article className="process-step" key={n}><div className="process-number">{n}</div><div className="process-line" /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <a className="know-more" href="/approach">Know more about our approach <span>→</span></a>
        </section>

        <TeamSection />
        <div className="section-wrap" style={{ paddingBottom: 70 }}><a className="know-more" href="/team">Know more about the team <span>→</span></a></div>

        <section className="section-wrap careers-section" id="careers">
          <div className="careers-card">
            <div className="careers-orb" aria-hidden="true"><span>G</span></div>
            <div className="careers-content"><div className="section-kicker"><span>06</span> / CAREERS</div><h2>Make room for<br /><span className="gradient-text">your curiosity.</span></h2><p>Interested in AI, engineering, research or building products with purpose? Tell us what you’re good at, what you want to learn and what you’d love to build.</p><a className="button button-primary" href="mailto:hello.gensolutions@gmail.com?subject=Careers%20at%20GenSolutions">Introduce yourself <span>↗</span></a><span className="careers-note">No specific opening is advertised here. We welcome relevant introductions.</span></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-layout">
            <div className="contact-intro">
              <div className="section-kicker"><span>07</span> / START A CONVERSATION</div>
              <h2>Have a problem<br />worth <span className="gradient-text">solving?</span></h2>
              <p>Tell us what you’re working on. Whether it’s an AI challenge, a product idea, an R&D collaboration or an engineering engagement, we’d like to hear about it.</p>
              <a className="know-more quiet" href="/contact">Open the full enquiry page <span>→</span></a>
              <div className="contact-direct"><span className="contact-direct-icon">↗</span><div><span className="muted-text small-label">EMAIL US DIRECTLY</span><a href="mailto:hello.gensolutions@gmail.com">hello.gensolutions@gmail.com</a></div></div>
              <div className="contact-direct"><span className="contact-direct-icon">⌁</span><div><span className="muted-text small-label">OUR APPROACH</span><span>Thoughtful conversations. Clear next steps.</span></div></div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-wrap footer-main">
          <a href="#home" className="brand footer-brand"><span className="brand-mark">G<span>.</span></span><span className="brand-text">GenSolutions<small>GENERATIVE SOLUTIONS</small></span></a>
          <p>We generate solutions,<br />not just software.</p>
          <div className="footer-links"><a href="/about">About</a><a href="/capabilities">Capabilities</a><a href="/work">Products</a><a href="/team">Team</a><a href="/#careers">Careers</a><a href="/contact">Contact</a></div>
        </div>
        <div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} GenSolutions. Built with intent.</span><span className="mono">{"< GENERATIVE_SOLUTIONS />"}</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </>
  );
}
