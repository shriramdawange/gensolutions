"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const finish = () => {
      setHidden(true);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("gs:reveal"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const padded = String(Math.round(counter.v)).padStart(2, "0");
        if (countRef.current) countRef.current.textContent = padded;
        if (barRef.current) barRef.current.style.width = `${counter.v}%`;
      }
    }).to(rootRef.current, {
      duration: 0.85,
      ease: "power3.inOut",
      onStart: () => rootRef.current?.classList.add("is-done")
    });
    tl.add(() => {
      finish();
    }, "-=0.75");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="k-preloader" aria-hidden="true">
      <div className="k-preloader-count">
        [<span ref={countRef}>00</span>%]
      </div>
      <div className="k-preloader-name">
        <span className="k-mask">
          <span>GenSolutions</span>
        </span>
      </div>
      <div className="k-preloader-bar">
        <i ref={barRef} />
      </div>
    </div>
  );
}
