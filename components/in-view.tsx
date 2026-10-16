"use client";

import { useEffect, useRef } from "react";

export default function InView({
  className = "",
  children,
  style,
  threshold = 0.2,
  once = true
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-inview");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-inview");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-inview");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
