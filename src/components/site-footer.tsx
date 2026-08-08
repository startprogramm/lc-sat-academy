import Link from "next/link";
import { BubbleMark } from "./logo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#practice-tests", label: "Practice tests" },
      { href: "/#question-bank", label: "Question bank" },
      { href: "/#progress", label: "Progress tracking" },
      { href: "/pricing", label: "Pricing" },
      { href: "/courses/sat-math", label: "SAT Math (in person)" },
      { href: "/features/classrooms", label: "For classrooms" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/15 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-xs">
            <span className="inline-flex items-center gap-2.5">
              <BubbleMark className="h-8 w-8" fill="var(--pencil)" />
              <span className="font-display text-[1.15rem] font-extrabold uppercase tracking-tight">
                LC <span className="text-pencil">SAT</span> Academy
              </span>
            </span>
            <p className="mt-4 text-sm leading-6 text-paper/60">
              Practice like it&apos;s test day. Full-length digital SAT
              practice, an adaptive question bank, and score tracking built
              for one goal: your target score.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper/50">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-paper/80 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LC SAT Academy. All rights reserved.</p>
          <p className="max-w-xl">
            SAT® is a trademark registered by the College Board, which is not
            affiliated with, and does not endorse, this product.
          </p>
        </div>
      </div>
    </footer>
  );
}
