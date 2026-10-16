"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("k-cursor-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      cursorRef.current?.classList.add("is-hover");
      if (labelRef.current) labelRef.current.textContent = el.dataset.cursor || "View";
    };
    const leave = () => cursorRef.current?.classList.remove("is-hover");

    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      document.documentElement.classList.remove("k-cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="k-cursor" aria-hidden="true">
        <div className="k-cursor-ring" />
        <span ref={labelRef} className="k-cursor-label" />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          margin: "-2px 0 0 -2px",
          borderRadius: "50%",
          background: "#6fff54",
          zIndex: 300,
          pointerEvents: "none",
          opacity: 0
        }}
      />
    </>
  );
}
