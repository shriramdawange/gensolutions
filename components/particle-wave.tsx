"use client";

import { useEffect, useRef } from "react";

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      frame += 0.004;
      ctx.clearRect(0, 0, width, height);

      // Fine particles arranged along several continuous wave paths.
      const spacing = width < 600 ? 8 : 5;
      const rows = Math.ceil(height / spacing);
      const cols = Math.ceil(width / spacing);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;

          const nx = x / Math.max(width, 1);
          const ny = y / Math.max(height, 1);

          const envelope =
            Math.sin(nx * Math.PI * 2.5 + frame) * 0.5 +
            Math.sin(nx * Math.PI * 5 - frame * 0.7) * 0.25 +
            Math.sin(nx * Math.PI * 8 + frame * 0.45) * 0.12;

          const center =
            height * 0.43 +
            envelope * height * 0.25;

          const ripple =
            Math.sin(nx * 25 + ny * 8 + frame * 2) *
            Math.cos(nx * 12 - frame);

          const waveWidth =
            height * (0.035 + Math.abs(envelope) * 0.12);

          const distance = Math.abs(y - center);
          const influence = Math.exp(
            -(distance * distance) /
              (2 * waveWidth * waveWidth)
          );

          const detail =
            Math.sin(nx * 75 + ny * 24 + frame * 1.5) *
            Math.cos(ny * 20 - frame * 0.8);

          const secondary =
            Math.sin(nx * 17 + frame * 0.8) *
            Math.sin(nx * 31 - frame * 0.6);

          const alpha = Math.max(
            0,
            influence * (0.14 + Math.abs(detail) * 0.45) +
              Math.max(0, 0.09 - Math.abs(distance / height)) *
                Math.abs(secondary) -
              0.025
          );

          if (alpha < 0.035) continue;

          const py =
            y +
            ripple * influence * 12 +
            Math.sin(nx * 15 + frame) * influence * 5;

          const radius = 0.35 + influence * Math.abs(detail) * 0.8;

          ctx.beginPath();
          ctx.arc(x, py, radius, 0, Math.PI * 2);
          const cyan = (row + col) % 4 === 0;
          ctx.fillStyle = cyan
            ? `rgba(110, 244, 210, ${Math.min(alpha, 0.6)})`
            : `rgba(183, 255, 90, ${Math.min(alpha * 0.85, 0.55)})`;
          ctx.fill();
        }
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();

    // Reduced motion: paint one static frame, no loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = 0.6;
      ctx.clearRect(0, 0, width, height);
      const spacing = width < 600 ? 8 : 5;
      const rows = Math.ceil(height / spacing);
      const cols = Math.ceil(width / spacing);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;
          const nx = x / Math.max(width, 1);
          const envelope = Math.sin(nx * Math.PI * 2.5 + frame) * 0.5;
          const center = height * 0.43 + envelope * height * 0.25;
          const distance = Math.abs(y - center);
          const waveWidth = height * 0.05;
          const influence = Math.exp(-(distance * distance) / (2 * waveWidth * waveWidth));
          if (influence < 0.2) continue;
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(183, 255, 90, ${Math.min(influence * 0.4, 0.5)})`;
          ctx.fill();
        }
      }
      return;
    }

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="gs-wave-canvas"
      aria-hidden="true"
    />
  );
}
