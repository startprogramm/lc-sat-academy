"use client";

import { useState } from "react";
import Link from "next/link";
import { Gauge, Settings, LogOut } from "lucide-react";
import { Logo } from "./logo";
import { Avatar } from "./avatar";
import { UserMenu } from "./user-menu";
import { signOutAndRedirect } from "@/app/actions/auth";

const NAV_LINKS = [
  { href: "/#practice-tests", label: "Practice tests" },
  { href: "/#question-bank", label: "Question bank" },
  { href: "/#progress", label: "Progress" },
  { href: "/pricing", label: "Pricing" },
  { href: "/courses/sat-math", label: "In-person classes" },
  { href: "/#resources", label: "Resources" },
];

type SiteHeaderProps = {
  user: {
    name: string | null;
    image: string | null;
  } | null;
};

export function SiteHeader({ user }: SiteHeaderProps) {
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
          {user ? (
            <div className="hidden sm:block">
              <UserMenu user={user} />
            </div>
          ) : (
            <>
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
            </>
          )}

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
            {user ? (
              <>
                <li className="mt-2 flex items-center gap-2 border-t border-line px-2 pt-3 pb-1">
                  <Avatar
                    name={user.name}
                    image={user.image}
                    className="h-8 w-8"
                  />
                  <span className="truncate text-sm font-semibold text-ink">
                    {user.name ?? "Your account"}
                  </span>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                  >
                    <Gauge className="h-[18px] w-[18px]" strokeWidth={2} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                  >
                    <Settings className="h-[18px] w-[18px]" strokeWidth={2} />
                    Settings
                  </Link>
                </li>
                <li>
                  <form action={signOutAndRedirect}>
                    <button
                      type="submit"
                      className="flex w-full items-center gap-2.5 rounded-md px-2 py-2.5 text-left text-base font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                    >
                      <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
                      Log out
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
