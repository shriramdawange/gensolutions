"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

const links = [
  ["Capabilities", "/capabilities"],
  ["Our work", "/work"],
  ["About", "/about"],
  ["Team", "/team"],
  ["Contact", "/contact"]
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="GenSolutions home" onClick={() => setOpen(false)}>
          <span className="brand-mark">G<span>.</span></span>
          <span className="brand-text">GenSolutions<small>GENERATIVE SOLUTIONS</small></span>
        </Link>
        <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-mobile-cta" href="/start-project" onClick={() => setOpen(false)}>Start a project ↗</a>
        </nav>
        <a className="header-cta" href="/start-project">Start a project <span>↗</span></a>
        <button className={`menu-toggle ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><Rocket size={18} strokeWidth={1.8} /></button>
      </div>
    </header>
  );
}
