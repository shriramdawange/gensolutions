import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = { title: "Shriram Dawange — Founder" };

const stats = [
  ["45+", "National hackathons & challenges"],
  ["02", "Ventures founded & scaled"],
  ["06+", "Team leads mentored"],
  ["30%", "Engagement lift at Heal Bharat"],
];

const experience = [
  {
    role: "Founder & CEO",
    org: "Gen Solution",
    time: "2025 — Present",
    points: [
      "Founded and lead an AI-centric software consultancy delivering full-lifecycle client projects across web development, digital advertising and AI-integrated workflows.",
      "Directed delivery for RC Studio (architecture-firm portfolio site + pitch), Sharanpur Wood Art & Furniture (video ad campaign) and The Good Shelf (QA test cycle).",
    ],
  },
  {
    role: "Founder",
    org: "Airlance — Autonomous Medical Cargo Drone",
    time: "2024 — Present",
    points: [
      "Built the technical framework for an autonomous modular medical-cargo drone for emergency response in urban and hard-to-reach areas.",
      "Advanced through DBATU DFIIE Navankur Cohort 4.0 to the final Startup Selection Committee pitch; submitted a complete MSME Idea Hackathon package.",
      "Declined a ₹2,00,000 acquisition offer to retain full ownership.",
    ],
  },
  {
    role: "Project Lead",
    org: "ZeroBite — Non-Profit Food Rescue Platform",
    time: "2024 — Present",
    points: [
      "Engineered a Flutter + Firebase food-donation platform connecting NGOs, donors and volunteers, with OpenStreetMap logistics.",
      "Integrated Gemini-based AI food-safety verification and real-time tracking; designed the Firestore architecture end-to-end.",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    org: "Heal Bharat (Remote)",
    time: "2023 — 2024",
    points: [
      "Promoted from front-end to full-stack within 6 months under founder Om Sonawane.",
      "Optimized backend performance, contributing to a 30% increase in user engagement.",
    ],
  },
  {
    role: "Head, Coding Club (AIML & CSE)",
    org: "Hi-Tech Institute of Technology",
    time: "2024 — Present",
    points: ["Manage 6+ team leads and 5+ major student-led technical projects; mentor students for SIH, DIPEX and other hackathons."],
  },
  {
    role: "Campus Ambassador — Entrepreneurship",
    org: "E-Cell, IIT Bombay",
    time: "2025 — Present",
    points: ["Represent entrepreneurial culture and opportunities from E-Cell IIT Bombay across campus and region."],
  },
];

const achievements = [
  "SIH 2024 Grand Finalist in 2nd year — Smart India Hackathon Grand Finale (Ministry of Jal Shakti), competing against senior and final-year teams nationwide.",
  "Cleared 3 rounds of DBATU DFIIE Navankur Cohort 4.0 — from screening to the final SSC jury presentation for Airlance.",
  "Founded and scaled two active ventures before graduating — real client revenue plus a nationally-recognized medical drone concept.",
  "Declined a ₹2,00,000 acquisition offer for Airlance as a 2nd-year student — kept full ownership.",
  "Head of Coding Club across AIML & CSE — youngest-cohort student in a cross-department leadership role.",
];

const hackathons = [
  ["SIH 2024 Grand Finalist", "Ministry of Jal Shakti — hydraulic water transit analysis system."],
  ["DIPEX-2025 Finalist", "State-level exhibition of working models, COEP Pune."],
  ["R.I.S.E. Innovation Challenge Finalist", "All-India pre-revenue finale, Rotary Club Jalna Central."],
  ["DFIIE Navankur Cohort 4.0", "Final SSC jury round for Airlance."],
  ["ADCET Hackathon 2026 Finalist", "ZeroBite recognized as stand-out submission."],
  ["Inverse9 Hackathon Finalist", "Advanced to final evaluation."],
  ["UNDP ICPSD Agentic AI Assessment", "11-agent coordinator pipeline on Groq API under live exam conditions."],
  ["Intel AI Hackathon + Google Cloud Gen AI", "Enterprise agent training (OPEA) and Gen AI Exchange tracks."],
];

export default function FounderPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <div className="section-wrap subpage-hero">
          <div className="crumb"><a href="/">HOME</a><span>/</span><a href="/team">TEAM</a><span>/</span><span>FOUNDER</span></div>
          <div className="section-kicker" style={{ marginTop: 18 }}><span>★ FOUNDER</span> / GEN SOLUTIONS</div>
          <h1>Shriram<br /><span className="gradient-text">Dawange.</span></h1>
          <p>Founder &amp; CEO, Gen Solution · Full-stack AI developer &amp; agentic systems builder · B.Tech CSE (AI &amp; Software Systems), 2023–2027.</p>
          <p className="mono" style={{ fontSize: 11, color: "var(--dim)" }}>Chhatrapati Sambhajinagar, India · +91 7038944085 · <a href="mailto:shriramdawange.dev@gmail.com" style={{ color: "var(--green)" }}>shriramdawange.dev@gmail.com</a></p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="know-more" href="mailto:shriramdawange.dev@gmail.com">Work with me <span>↗</span></a>
            <a className="know-more quiet" href="https://github.com/shriramdawange" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            <a className="know-more quiet" href="https://in.linkedin.com/in/shriramdawange" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
            <a className="know-more quiet" href="/team">← Back to team</a>
          </div>
        </div>

        <section className="section-wrap" style={{ padding: "40px 0 0" }}>
          <div className="detail-grid" style={{ marginTop: 0 }}>
            {stats.map(([n, label]) => (
              <div className="detail-cell" key={label}>
                <h3 style={{ fontSize: 34, color: "var(--green)" }}>{n}</h3>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrap" style={{ padding: "60px 0 0" }}>
          <div className="section-kicker"><span>EXP</span> / EXPERIENCE &amp; VENTURES</div>
          <ul className="check-list">
            {experience.map((e) => (
              <li key={e.role + e.org} style={{ display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <strong style={{ color: "var(--text)" }}>{e.role} <span style={{ color: "var(--green)" }}>| {e.org}</span></strong>
                  <b>{e.time}</b>
                </div>
                <ul style={{ margin: "10px 0 0", paddingLeft: 18, display: "grid", gap: 6 }}>
                  {e.points.map((p) => <li key={p} style={{ border: 0, padding: 0 }}>{p}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-wrap" style={{ padding: "60px 0 0" }}>
          <div className="section-kicker"><span>★</span> / SPECIAL ACHIEVEMENTS</div>
          <ul className="check-list">
            {achievements.map((a, i) => <li key={a}><b>{String(i + 1).padStart(2, "0")}</b>{a}</li>)}
          </ul>
        </section>

        <section className="section-wrap" style={{ padding: "60px 0 0" }}>
          <div className="section-kicker"><span>45+</span> / HACKATHONS &amp; RECOGNITION</div>
          <div className="detail-grid">
            {hackathons.slice(0, 3).map(([t, c]) => <div className="detail-cell" key={t}><h3>{t}</h3><p>{c}</p></div>)}
          </div>
          <ul className="check-list">
            {hackathons.slice(3).map(([t, c]) => <li key={t}><b>◆</b><span><strong style={{ color: "var(--text)" }}>{t}</strong> — {c}</span></li>)}
          </ul>
        </section>

        <section className="section-wrap" style={{ padding: "60px 0 0" }}>
          <div className="section-kicker"><span>R</span> / RESEARCH &amp; STACK</div>
          <div className="detail-grid">
            <div className="detail-cell"><h3>Maritime surveillance</h3><p>Detecting illegal maritime activity with NASA optical satellite data.</p></div>
            <div className="detail-cell"><h3>ESG benchmarking</h3><p>Governance disclosure quality and greenwashing detection in ESG reports.</p></div>
            <div className="detail-cell"><h3>AI-directed builds</h3><p>Flutter · Firebase · Supabase · React · Gemini API · Groq · Vercel. Multi-agent architectures, rapid prototyping, rigorous review.</p></div>
          </div>
        </section>

        <div className="section-wrap subpage-cta">
          <div><div className="section-kicker"><span>GS</span> / FOUNDER ACCESS</div><h2 style={{ margin: 0 }}>Have something ambitious?</h2></div>
          <a className="know-more" href="mailto:shriramdawange.dev@gmail.com">Email Shriram <span>↗</span></a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
