"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";

const NAV_LINKS = [
  { href: "/practice-tests", label: "Practice tests" },
  { href: "/question-bank", label: "Question bank" },
  { href: "/progress", label: "Progress" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 sm:inline-flex"
          >
            Start free
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper px-6 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
              >
                Log in
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
              >
                Start free
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
