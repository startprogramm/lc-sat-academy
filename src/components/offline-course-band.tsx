import Link from "next/link";
import { MapPin } from "lucide-react";

export function OfflineCourseBand() {
  return (
    <section className="border-b border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-pencil">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} />
            Offline · in person
          </span>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-paper sm:text-4xl">
            Prefer a classroom? We teach SAT Math in person too.
          </h2>
          <p className="mt-3 max-w-lg text-paper/70">
            Three levels, every day, at our learning center — Foundation,
            Pre-SAT, and Advanced, plus a flagship track built around a
            perfect 800.
          </p>
        </div>
        <Link
          href="/courses/sat-math"
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors hover:brightness-95"
          style={{ backgroundColor: "var(--pencil)" }}
        >
          See the course schedule
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
