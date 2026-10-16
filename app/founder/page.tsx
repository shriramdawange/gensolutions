import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import InView from "@/components/in-view";

export const metadata: Metadata = { title: "Shriram Dawange — Founder" };

const stats = [
  ["45+", "National hackathons & challenges"],
  ["02", "Ventures founded & scaled"],
  ["06+", "Team leads mentored"],
  ["30%", "Engagement lift at Heal Bharat"]
];

const roles = [
  {
    role: "Founder & CEO",
    org: "Gen Solution",
    time: "2025 — Present",
    points: [
      "Founded and lead an AI-centric software consultancy delivering full-lifecycle client projects across web development, digital advertising and AI-integrated workflows.",
      "Directed delivery for RC Studio (architecture-firm portfolio site + pitch), Sharanpur Wood Art & Furniture (video ad campaign) and The Good Shelf (QA test cycle)."
    ]
  },
  {
    role: "Founder",
    org: "Airlance — Autonomous Medical Cargo Drone",
    time: "2024 — Present",
    points: [
      "Built the technical framework for an autonomous modular medical-cargo drone for emergency response in urban and hard-to-reach areas.",
      "Advanced through DBATU DFIIE Navankur Cohort 4.0 to the final Startup Selection Committee pitch; submitted a complete MSME Idea Hackathon package.",
      "Declined a ₹2,00,000 acquisition offer to retain full ownership."
    ]
  },
  {
    role: "Project Lead",
    org: "ZeroBite — Non-Profit Food Rescue Platform",
    time: "2024 — Present",
    points: [
      "Engineered a Flutter + Firebase food-donation platform connecting NGOs, donors and volunteers, with OpenStreetMap logistics.",
      "Integrated Gemini-based AI food-safety verification and real-time tracking; designed the Firestore architecture end-to-end."
    ]
  },
  {
    role: "Full-Stack Developer Intern",
    org: "Heal Bharat (Remote)",
    time: "2023 — 2024",
    points: [
      "Promoted from front-end to full-stack within 6 months under founder Om Sonawane.",
      "Optimized backend performance, contributing to a 30% increase in user engagement."
    ]
  },
  {
    role: "Head, Coding Club (AIML & CSE)",
    org: "Hi-Tech Institute of Technology",
    time: "2024 — Present",
    points: ["Manage 6+ team leads and 5+ major student-led technical projects; mentor students for SIH, DIPEX and other hackathons."]
  },
  {
    role: "Campus Ambassador — Entrepreneurship",
    org: "E-Cell, IIT Bombay",
    time: "2025 — Present",
    points: ["Represent entrepreneurial culture and opportunities from E-Cell IIT Bombay across campus and region."]
  }
];

const achievements = [
  "SIH 2024 Grand Finalist in 2nd year — Smart India Hackathon Grand Finale (Ministry of Jal Shakti), competing against senior and final-year teams nationwide.",
  "Cleared 3 rounds of DBATU DFIIE Navankur Cohort 4.0 — from screening to the final SSC jury presentation for Airlance.",
  "Founded and scaled two active ventures before graduating — real client revenue plus a nationally-recognized medical drone concept.",
  "Declined a ₹2,00,000 acquisition offer for Airlance as a 2nd-year student — kept full ownership.",
  "Head of Coding Club across AIML & CSE — youngest-cohort student in a cross-department leadership role."
];

const hackathons = [
  ["SIH 2024 Grand Finalist", "Ministry of Jal Shakti — hydraulic water transit analysis system."],
  ["DIPEX-2025 Finalist", "State-level exhibition of working models, COEP Pune."],
  ["R.I.S.E. Innovation Challenge Finalist", "All-India pre-revenue finale, Rotary Club Jalna Central."],
  ["DFIIE Navankur Cohort 4.0", "Final SSC jury round for Airlance."],
  ["ADCET Hackathon 2026 Finalist", "ZeroBite recognized as stand-out submission."],
  ["Inverse9 Hackathon Finalist", "Advanced to final evaluation."],
  ["UNDP ICPSD Agentic AI Assessment", "11-agent coordinator pipeline on Groq API under live exam conditions."],
  ["Intel AI Hackathon + Google Cloud Gen AI", "Enterprise agent training (OPEA) and Gen AI Exchange tracks."]
];

const research = [
  { title: "Maritime surveillance", copy: "Detecting illegal maritime activity with NASA optical satellite data." },
  { title: "ESG benchmarking", copy: "Governance disclosure quality and greenwashing detection in ESG reports." },
  {
    title: "AI-directed builds",
    copy: "Flutter · Firebase · Supabase · React · Gemini API · Groq · Vercel. Multi-agent architectures, rapid prototyping, rigorous review."
  }
];

export default function FounderPage() {
  return (
    <>
      <main className="k-sub">
        <PageHero
          crumbs={[{ label: "HOME", href: "/" }, { label: "TEAM", href: "/team" }, { label: "FOUNDER" }]}
          eyebrow="★ Founder · Gen Solutions"
          title={
            <>
              Shriram
              <br />
              <span className="k-display">Dawange.</span>
            </>
          }
          lead="Founder & CEO, Gen Solution · Full-stack AI developer & agentic systems builder · B.Tech CSE (AI & Software Systems), 2023–2027 · Chhatrapati Sambhajinagar, India."
          actions={
            <>
              <a className="k-btn k-btn--solid" href="mailto:shriramdawange.dev@gmail.com">
                Work with me <span className="k-btn-arrow">↗</span>
              </a>
              <a className="k-btn" href="https://github.com/shriramdawange" target="_blank" rel="noreferrer">
                GitHub <span className="k-btn-arrow">↗</span>
              </a>
              <a className="k-btn" href="https://in.linkedin.com/in/shriramdawange" target="_blank" rel="noreferrer">
                LinkedIn <span className="k-btn-arrow">↗</span>
              </a>
              <Link className="k-btn" href="/team">
                ← Back to team
              </Link>
            </>
          }
        />

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-stats">
              {stats.map(([n, label]) => (
                <div className="k-stat" key={label}>
                  <div className="k-stat-value">{n}</div>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <InView className="k-block-head k-rv">
              <div className="k-eyebrow">Experience &amp; ventures</div>
            </InView>
            <ul className="k-timeline">
              {roles.map((e) => (
                <li key={e.role + e.org}>
                  <div className="k-tl-head">
                    <span className="k-tl-role">
                      {e.role} <span className="k-tl-org">| {e.org}</span>
                    </span>
                    <span className="k-tl-time">{e.time}</span>
                  </div>
                  <ul className="k-tl-points">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-block-head">
              <div className="k-eyebrow">Special achievements</div>
              <h2 className="k-block-title">A record, not a résumé.</h2>
            </div>
            <ul className="k-list">
              {achievements.map((a, i) => (
                <li key={a}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-block-head">
              <div className="k-eyebrow">45+ / Hackathons &amp; recognition</div>
              <h2 className="k-block-title">Competition as practice.</h2>
            </div>
            <div className="k-cards">
              {hackathons.slice(0, 3).map(([t, c]) => (
                <article className="k-card" key={t}>
                  <h3 style={{ marginTop: 0 }}>{t}</h3>
                  <p>{c}</p>
                </article>
              ))}
            </div>
            <ul className="k-list" style={{ marginTop: "1.25rem" }}>
              {hackathons.slice(3).map(([t, c]) => (
                <li key={t}>
                  <b>◆</b>
                  <span>
                    <strong style={{ color: "var(--k-headline)" }}>{t}</strong> — {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-block-head">
              <div className="k-eyebrow">Research &amp; stack</div>
              <h2 className="k-block-title">Where the curiosity points.</h2>
            </div>
            <div className="k-cards">
              {research.map((r) => (
                <article className="k-card" key={r.title}>
                  <h3 style={{ marginTop: 0 }}>{r.title}</h3>
                  <p>{r.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="k-block">
          <div className="k-wrap">
            <div className="k-hero-actions" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div className="k-eyebrow">Founder access</div>
                <h2 className="k-block-title" style={{ marginTop: "0.75rem" }}>
                  Have something <span className="k-display">ambitious?</span>
                </h2>
              </div>
              <a className="k-btn k-btn--solid" href="mailto:shriramdawange.dev@gmail.com">
                Email Shriram <span className="k-btn-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
