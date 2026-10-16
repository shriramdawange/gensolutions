"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const links: [string, string][] = [
  ["Work", "/work"],
  ["Capabilities", "/capabilities"],
  ["Approach", "/approach"],
  ["About", "/about"]
];

export default function ScrollNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const current = links.find(([, href]) => isActive(href))?.[0] ?? "Home";

  return (
    <>
      <nav className="k-nav" aria-label="Primary">
        <ThemeToggle />
        {links.map(([label, href]) => (
          <Link key={href} href={href} className={`k-nav-item ${isActive(href) ? "is-active" : ""}`}>
            <span className="k-nav-chip" aria-hidden="true" />
            {label}
          </Link>
        ))}
        <Link href="/contact" className="k-nav-item k-nav-talk">
          Let&rsquo;s talk <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </Link>
      </nav>

      <div className={`k-mnav ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>
          Let&rsquo;s talk
        </Link>
      </div>

      <div className="k-mnav-bar">
        <ThemeToggle />
        <button
          type="button"
          className="k-mnav-main"
          aria-expanded={open}
          aria-label={`${current}, open menu`}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Menu" : current}</span>
          <span className="k-mnav-burger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </>
  );
}
