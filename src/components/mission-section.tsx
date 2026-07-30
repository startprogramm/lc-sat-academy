export function MissionSection() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Why LC SAT Academy
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Built for the digital SAT, not the old one.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-ink-soft">
          <p>
            The SAT changed — shorter, adaptive, and taken on a screen. Most
            prep material didn&apos;t catch up. LC SAT Academy is built from
            the ground up for the digital, adaptive format: realistic
            Bluebook-style timing, module-by-module difficulty, and practice
            that tells you exactly which skills are costing you points.
          </p>
          <p>
            No generic worksheets. Every practice test behaves like the real
            thing, and every question comes with an explanation that teaches
            the underlying skill, not just the right answer.
          </p>
        </div>
      </div>
    </section>
  );
}
