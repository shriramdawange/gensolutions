"use client";

import { useEffect, useRef } from "react";

type Word = { t: string; u?: boolean };

const FLOW: Word[] = [
  { t: "Curiosity" }, { t: "is" }, { t: "the" }, { t: "starting" }, { t: "point." },
  { t: "We" }, { t: "are" }, { t: "an" }, { t: "engineering" }, { t: "and" }, { t: "innovation" }, { t: "company" },
  { t: "working" }, { t: "at" }, { t: "the" }, { t: "intersection" }, { t: "of" },
  { t: "AI,", u: true }, { t: "research" }, { t: "and" }, { t: "product" }, { t: "development" },
  { t: "—" }, { t: "turning" }, { t: "complex" }, { t: "challenges" }, { t: "into" },
  { t: "intuitive,", u: true }, { t: "reliable" }, { t: "systems" }, { t: "that" }, { t: "create" },
  { t: "measurable", u: true }, { t: "impact.", u: true }
];

export default function AboutReveal() {
  const flowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".k-word"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("is-lit"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-lit");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 1, rootMargin: "0px 0px -12% 0px" }
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);

  return (
    <section className="k-section k-about" id="about">
      <div className="k-wrap">
        <div className="k-eyebrow">01 / Who we are</div>
        <p className="k-about-flow" ref={flowRef}>
          {FLOW.map((w, i) => (
            <span key={`${w.t}-${i}`}>
              <span className="k-word">
                {w.u ? <span className="k-u">{w.t}</span> : w.t}
              </span>
              {i < FLOW.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div className="k-about-meta">
          <span>GenSolutions — Generative Solutions</span>
          <span className="k-muted">AI · Engineering · R&amp;D · Products</span>
          <span className="k-muted">Built in India, for real-world impact</span>
        </div>
      </div>
    </section>
  );
}
