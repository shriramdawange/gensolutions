"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export default function MediaBand() {
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

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (let l = 0; l < 4; l++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y =
            h * 0.5 +
            Math.sin(x * 0.006 + t * (1 + l * 0.3) + l) * h * 0.05 * (l + 1) +
            Math.sin(x * 0.013 + t * 2) * h * 0.015;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(111, 255, 84, ${Math.max(0.08, 0.5 - l * 0.11)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="k-media" aria-label="Our work in motion">
      <div className="k-media-stage">
        <canvas ref={canvasRef} className="k-media-canvas" aria-hidden="true" />
        <div className="k-media-marquee" aria-hidden="true">
          <div className="k-marquee-track" style={{ animationDuration: "28s" }}>
            {[0, 1].map((half) => (
              <div className="k-marquee-group" key={half}>
                <span className="k-display">In development</span>
                <span>Products with purpose</span>
                <span className="k-mark">✳</span>
              </div>
            ))}
          </div>
        </div>
        <Link className="k-media-play" href="/work" aria-label="See our work">
          <Play fill="currentColor" strokeWidth={0} />
        </Link>
      </div>
    </section>
  );
}
