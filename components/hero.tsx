"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const LINES = [
  { text: "We generate", display: false },
  { text: "solutions,", display: true },
  { text: "not just software.", display: false }
];

function Chars({ text, display }: { text: string; display: boolean }) {
  return (
    <span className={display ? "k-display" : undefined}>
      {Array.from(text).map((ch, i) => (
        <span className="k-char-mask" key={`${ch}-${i}`} aria-hidden="true">
          <span>{ch === " " ? "\u00A0" : ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.32, y: 0.42, r: 0.55, c: "rgba(10, 228, 72, 0.20)" },
      { x: 0.72, y: 0.58, r: 0.6, c: "rgba(102, 234, 34, 0.15)" },
      { x: 0.5, y: 0.28, r: 0.45, c: "rgba(169, 252, 131, 0.10)" }
    ];

    const draw = () => {
      t += 0.0028;
      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t + b.x * 9) * 0.08) * w;
        const cy = (b.y + Math.cos(t + b.y * 9) * 0.08) * h;
        const r = b.r * Math.min(w, h) * 1.5;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(".k-hero-mark", { opacity: 0, y: 24 });
      gsap.set(".k-char-mask > span", { yPercent: 115 });
      gsap.set(".k-hero-actions", { opacity: 0, y: 20 });
      gsap.set(".k-hero-tags", { opacity: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(".k-hero-mark", { opacity: 1, y: 0, duration: 0.7 })
          .to(".k-char-mask > span", { yPercent: 0, duration: 1, stagger: 0.028 }, "-=0.35")
          .to(".k-hero-actions", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
          .to(".k-hero-tags", { opacity: 1, duration: 0.8 }, "-=0.45");
      };

      window.addEventListener("gs:reveal", play);
      const fallback = window.setTimeout(play, 3400);
      return () => {
        window.removeEventListener("gs:reveal", play);
        window.clearTimeout(fallback);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="k-hero" id="home" ref={rootRef}>
      <canvas className="k-hero-shader" ref={canvasRef} aria-hidden="true" />
      <div className="k-hero-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path
            d="M38 10 A20 20 0 1 0 44 24 L28 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="k-hero-title">
        <span className="k-sr-only">We generate solutions, not just software.</span>
        {LINES.map((line) => (
          <span className="k-mask" key={line.text} style={{ display: "block" }} aria-hidden="true">
            <Chars text={line.text} display={line.display} />
          </span>
        ))}
      </h1>
      <div className="k-hero-actions">
        <Link className="k-btn k-btn--solid" href="/start-project">
          Start a project <span className="k-btn-arrow">↗</span>
        </Link>
        <Link className="k-btn" href="/work">
          See our work <span className="k-btn-arrow">→</span>
        </Link>
      </div>
      <div className="k-hero-tags">
        <p>AI engineering, research and product development — built by the people you actually talk to.</p>
        <p>For teams who need it shipped, not just discussed.</p>
      </div>
    </section>
  );
}
