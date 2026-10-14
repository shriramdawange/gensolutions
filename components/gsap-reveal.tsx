"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TARGETS = [
  ".section-kicker",
  ".intro-layout > *",
  ".section-heading > *",
  ".service-card",
  ".product-card",
  ".process-step",
  ".gs-team__card",
  ".team-copy > *",
  ".careers-card",
  ".contact-layout > *",
  ".detail-cell",
  ".check-list li",
  ".gs-index li",
  ".gs-exp-stages a",
  ".sp-node",
  ".footer-main > *",
].join(",");

export default function GsapReveal() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Thin scroll progress bar
      if (barRef.current) {
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      }
      // Hero entrance: eyebrow → headline → lede → actions → visual
      gsap.fromTo(
        ".hero-copy > *",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }
      );
      gsap.fromTo(
        ".hero-art",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.25, overwrite: true }
      );
      gsap.fromTo(
        ".subpage-hero > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }
      );

      // Scroll reveals everywhere else
      const items = gsap.utils.toArray<HTMLElement>(TARGETS);
      items.forEach((el) => {
        if (el.closest(".hero-copy") || el.closest(".subpage-hero")) return;
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            overwrite: true,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
