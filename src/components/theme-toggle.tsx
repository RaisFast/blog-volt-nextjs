"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  function toggle() {
    const next = !(dark ?? document.documentElement.classList.contains("dark"));
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  const isDark = dark ?? (typeof window !== "undefined" && document.documentElement.classList.contains("dark"));

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center size-8 hover:text-primary transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
