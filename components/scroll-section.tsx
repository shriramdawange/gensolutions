"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function ScrollSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gs-scroll-word",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(
        ".gs-scroll-word",
        { yPercent: 18 },
        { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } }
      );
      gsap.fromTo(
        ".gs-shape-band",
        { xPercent: 5 },
        { xPercent: -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } }
      );
      gsap.utils.toArray<HTMLElement>(".gs-scroll-art .gs-shape").forEach((s, i) => {
        gsap.to(s, {
          y: (i % 2 === 0 ? -1 : 1) * (16 + i * 5),
          rotation: (i % 2 === 0 ? 1 : -1) * 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
        });
      });
    }, root);
    if (window.matchMedia("(pointer: fine)").matches) {
      Draggable.create(".gs-scroll-art .gs-hdrag", {
        type: "x,y",
        bounds: root.current,
        edgeResistance: 0.7,
        onDragEnd() { gsap.to(this.target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" }); },
      });
    }
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="gs-scroll-art" aria-label="Scroll study">
      <div className="section-wrap gs-scroll-top">
        <div className="section-kicker"><span>✳</span> / SCROLL STUDY</div>
        <h2 className="gs-scroll-word" aria-label="Gen">Gen</h2>
        <p>Keep scrolling — the rings ride with you.<br />GSAP ScrollTrigger, scrubbed to our green.</p>
      </div>
      <div className="gs-shape-viewport">
        <div className="gs-shape-band" aria-hidden="true">
          <span className="gs-hdrag"><span className="gs-shape s-pill-a" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-clover" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-ring" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-diamond" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-pill-b" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-dome" /></span>
          <span className="gs-hdrag"><span className="gs-shape s-dot" /></span>
        </div>
      </div>
      <div className="section-wrap gs-scroll-chips">
        <span className="gs-chip chip-a">Smooth</span>
        <span className="gs-chip chip-b">Scrubbed</span>
        <span className="gs-scroll-note mono">GSAP · SCROLLTRIGGER · SCRUB 1.0</span>
      </div>
    </section>
  );
}
