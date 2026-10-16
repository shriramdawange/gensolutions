"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "light") document.documentElement.dataset.theme = "light";
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      className={`k-theme-btn ${className}`}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggle}
    >
      <Sun className="sun" strokeWidth={1.5} aria-hidden="true" />
      <Moon className="moon" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
