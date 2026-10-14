"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORD = "GenSolutions";

export default function HeroGsap() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Smooth entrance: eyebrow → letters → tagline → buttons → shapes
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".gs-hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
        .fromTo(".gs-hero-letter", { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045 }, 0.2)
        .fromTo(".gs-hero-tag", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.75)
        .fromTo(".gs-hero-cta", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.9)
        .fromTo(".gs-hero-shape", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, stagger: 0.07, ease: "back.out(1.6)" }, 0.7)
        .fromTo(".gs-hero-foot", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.2);

      // Buttery scroll-out: word floats up, band slides sideways
      gsap.to(".gs-hero-word", {
        yPercent: -24,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(
        ".gs-hero-band",
        { xPercent: 4 },
        { xPercent: -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } }
      );
      gsap.utils.toArray<HTMLElement>(".gs-hero-shape").forEach((s, i) => {
        gsap.to(s, {
          y: (i % 2 === 0 ? -1 : 1) * (14 + i * 5),
          rotation: (i % 2 === 0 ? 1 : -1) * 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.4 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="gs-hero">
      <div className="eyebrow gs-hero-eyebrow"><span className="status-dot" /> INDEPENDENT ENGINEERING &amp; R&amp;D — LIVE LAB</div>
      <h1 className="gs-hero-word" aria-label="GenSolutions">
        {WORD.split("").map((ch, i) => (
          <span key={i} className="gs-hero-letter" aria-hidden="true">{ch}</span>
        ))}
      </h1>
      <p className="hero-lede gs-hero-tag">We generate <span className="gradient-text">solutions,</span> not just software.</p>
      <div className="hero-actions">
        <a className="button button-primary pointer-events-auto gs-hero-cta" href="#work">Explore our work</a>
        <a className="button button-quiet pointer-events-auto gs-hero-cta" href="/contact">Build with us <span aria-hidden="true">→</span></a>
      </div>
      <div className="gs-hero-band" aria-hidden="true">
        <span className="gs-shape gs-hero-shape s-pill-a" />
        <span className="gs-shape gs-hero-shape s-ring" />
        <span className="gs-shape gs-hero-shape s-clover" />
        <span className="gs-shape gs-hero-shape s-diamond" />
        <span className="gs-shape gs-hero-shape s-pill-b" />
        <span className="gs-shape gs-hero-shape s-dome" />
        <span className="gs-shape gs-hero-shape s-dot" />
      </div>
      <div className="hero-footnote gs-hero-foot"><span className="mono">{"< GENERATIVE_SOLUTIONS />"}</span><span className="flow-text">Ideas → Engineer → Impact — live</span></div>
    </div>
  );
}
