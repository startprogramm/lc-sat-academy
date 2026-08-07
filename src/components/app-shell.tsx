"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gauge,
  ClipboardList,
  BookOpen,
  LineChart,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Logo } from "./logo";
import { Avatar } from "./avatar";
import { signOutAndRedirect } from "@/app/actions/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/practice-tests", label: "Practice tests", icon: ClipboardList },
  { href: "/question-bank", label: "Question bank", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/profile", label: "Settings", icon: Settings },
];

const COLLAPSE_KEY = "lc-sat-sidebar-collapsed";

type AppShellProps = {
  user: {
    name: string | null;
    email: string;
    image: string | null;
    role: string;
  };
  children: React.ReactNode;
};

function BackToHomeLink({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      title="Back to home"
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink ${
        collapsed ? "justify-center px-0" : ""
      }`}
    >
      <Home className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
      {collapsed ? null : "Back to home"}
    </Link>
  );
}

function NavLinks({
  pathname,
  collapsed,
  onNavigate,
}: {
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-0" : ""
              } ${
                active
                  ? "bg-brand/10 text-brand"
                  : "text-ink-soft hover:bg-paper-dim hover:text-ink"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
              {collapsed ? null : item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function UserCard({
  user,
  collapsed,
  onToggleCollapse,
}: {
  user: AppShellProps["user"];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  if (collapsed) {
    return (
      <div className="shrink-0 border-t border-line p-3">
        <div className="flex flex-col items-center gap-2">
          <Avatar name={user.name} image={user.image} className="h-9 w-9" />
          {onToggleCollapse ? (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
            >
              <ToggleIcon className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : null}
          <form action={signOutAndRedirect}>
            <button
              type="submit"
              aria-label="Log out"
              title="Log out"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 border-t border-line p-4">
      <div className="flex items-center gap-2">
        <Avatar name={user.name} image={user.image} className="h-9 w-9" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {user.name ?? user.email}
          </p>
          <p className="truncate text-xs capitalize text-ink-soft">
            {user.role}
          </p>
        </div>
        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <ToggleIcon className="h-4 w-4" strokeWidth={2} />
          </button>
        ) : null}
        <form action={signOutAndRedirect}>
          <button
            type="submit"
            aria-label="Log out"
            title="Log out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Syncing from localStorage (an external store) on mount, not derived
    // from props/state, so the server-rendered default is intentionally
    // "expanded" until this reconciles on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      const next = !v;
      localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="flex min-h-full flex-1">
      {/* Desktop sidebar: sticky to the viewport, collapsible to an icon rail */}
      <aside
        className={`hidden shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 lg:sticky lg:top-0 lg:flex lg:h-screen lg:self-start ${
          collapsed ? "lg:w-[76px]" : "lg:w-64"
        }`}
      >
        <Link
          href="/"
          className={`flex shrink-0 items-center px-5 py-5 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <Logo markClassName="h-7 w-7" withWordmark={!collapsed} />
        </Link>
        <div className={`shrink-0 pb-2 ${collapsed ? "px-2" : "px-3"}`}>
          <BackToHomeLink collapsed={collapsed} />
        </div>
        <nav
          className={`flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"}`}
        >
          <NavLinks pathname={pathname} collapsed={collapsed} />
        </nav>
        <UserCard
          user={user}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>

      {/* Content column: mobile top bar + drawer chrome, content rendered once */}
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
          <Link href="/">
            <Logo markClassName="h-7 w-7" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-ink/40"
            />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
                <Logo markClassName="h-7 w-7" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
              <div className="shrink-0 px-3 pt-3">
                <BackToHomeLink onNavigate={() => setMobileOpen(false)} />
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-2">
                <NavLinks
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
              </nav>
              <UserCard user={user} />
            </div>
          </div>
        ) : null}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
