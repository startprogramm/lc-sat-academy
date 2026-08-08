import Link from "next/link";
import { BubbleMark } from "./logo";
import { ScoreReportCard } from "./score-report-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <BubbleMark
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-ink/[0.04]"
        fill="transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Digital SAT · Adaptive practice
          </span>

          <h1 className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Practice
            <br />
            like it&apos;s
            <br />
            <span className="text-accent">test day.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-7 text-ink-soft">
            Full-length digital SAT practice tests, an adaptive question
            bank, and score tracking that shows exactly where to focus
            next.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
            >
              Start practicing free
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Take a diagnostic test
            </Link>
            <Link
              href="/#in-person-classes"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              Classes
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink-soft">
            No credit card. 3 free practice tests to start.
          </p>
        </div>

        <ScoreReportCard />
      </div>
    </section>
  );
}
