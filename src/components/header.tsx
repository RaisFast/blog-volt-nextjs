"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/categories", label: "CATEGORIES" },
  { href: "/tags", label: "TAGS" },
  { href: "/about", label: "ABOUT" },
];

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/raisfast/raisfast";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-foreground text-background border-b-4 border-primary h-14 flex items-center relative z-50">
      <div className="w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.3em] hover:text-primary transition-colors"
        >
          VOLT
        </Link>

        <nav className="hidden md:flex items-center gap-6 uppercase text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              [{link.label}]
            </Link>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="/search"
            className="hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search className="size-4" />
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center size-8 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute inset-0 top-full h-[calc(100vh-3.5rem)] bg-foreground text-background flex flex-col items-center justify-center gap-8 border-b-4 border-primary md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold uppercase tracking-wide border-3 border-background px-8 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              [{link.label}]
            </Link>
          ))}
          <a
            href="/search"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold uppercase tracking-wide border-3 border-background px-8 py-3 hover:border-primary hover:text-primary transition-colors flex items-center gap-3"
          >
            [SEARCH]
            <Search className="size-5" />
          </a>
        </div>
      )}
    </header>
  );
}
