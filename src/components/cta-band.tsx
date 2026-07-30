import Link from "next/link";

export function CtaBand() {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center">
        <h2 className="max-w-lg font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-paper sm:text-4xl">
          Ready to hit your target score?
        </h2>
        <Link
          href="/signup"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
        >
          Start practicing free
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
