"use client";

import { useEffect, useRef } from "react";
import { Hand } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function Personality() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Headline eases in once
      gsap.fromTo(
        ".gs-pers-line > *",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 78%", once: true } }
      );
      // Small elements FLY on scroll — fast scrub multipliers
      gsap.to(".gs-pers-chip-a", {
        x: -160, y: -60, rotation: -18, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      gsap.to(".gs-pers-chip-b", {
        x: 190, y: 50, rotation: 22, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      gsap.to(".gs-pers-hand", {
        y: -220, rotation: 24, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      gsap.to(".gs-pers-box", {
        x: -60, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".gs-pers-tail", {
        x: 90, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    }, root);
    // Draggable stickers + hand (fine pointers only, so mobile scroll never fights)
    if (window.matchMedia("(pointer: fine)").matches) {
      Draggable.create(".gs-pers .gs-drag", {
        type: "x,y",
        bounds: root.current,
        edgeResistance: 0.65,
        onPress() { gsap.to(this.target, { scale: 1.12, duration: 0.2 }); },
        onDragEnd() { gsap.to(this.target, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" }); },
      });
    }
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="gs-pers" aria-label="GenSolutions personality">
      <div className="section-wrap">
        <div className="section-kicker"><span>✳</span> / EXPERIENCE</div>
        <div className="gs-pers-line">
          <span className="gs-pers-box">Engineered</span>
          <span className="gs-pers-stickers" aria-hidden="true">
            <span className="gs-drag"><span className="gs-pers-chip gs-pers-chip-a">Smooth</span></span>
            <span className="gs-drag"><span className="gs-pers-chip gs-pers-chip-b">Alive</span></span>
          </span>
          <span className="gs-pers-tail">with personality.</span>
        </div>
        <span className="gs-drag gs-drag-hand"><Hand className="gs-pers-hand" aria-hidden="true" strokeWidth={1.2} /></span>
        <div className="gs-pers-sub">
          <p>Motion with intent — every ease tuned, every pixel awake.</p>
          <a className="know-more" href="/experience">Enter experience <span>→</span></a>
          <span className="gs-pers-tip mono">TIP — GRAB THE STICKERS ✋</span>
        </div>
      </div>
    </section>
  );
}
