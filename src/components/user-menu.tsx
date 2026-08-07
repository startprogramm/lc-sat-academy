"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Gauge, Settings, LogOut } from "lucide-react";
import { Avatar } from "./avatar";
import { signOutAndRedirect } from "@/app/actions/auth";

type UserMenuProps = {
  user: { name: string | null; image: string | null };
};

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line py-1 pl-1 pr-2 transition-colors hover:border-ink"
      >
        <Avatar name={user.name} image={user.image} className="h-7 w-7" />
        <ChevronDown
          className={`h-4 w-4 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-lg"
        >
          <p className="truncate px-3 py-2 text-sm font-semibold text-ink">
            {user.name ?? "Your account"}
          </p>
          <div className="my-1 h-px bg-line" />
          <Link
            href="/dashboard"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <Gauge className="h-4 w-4" strokeWidth={2} />
            Dashboard
          </Link>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <Settings className="h-4 w-4" strokeWidth={2} />
            Settings
          </Link>
          <div className="my-1 h-px bg-line" />
          <form action={signOutAndRedirect}>
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Log out
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
