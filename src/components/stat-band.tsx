const STATS = [
  { value: "2,400+", label: "Practice questions" },
  { value: "14", label: "Full-length practice tests" },
  { value: "2", label: "Adaptive modules per section" },
  { value: "100%", label: "Aligned to the digital format" },
];

export function StatBand() {
  return (
    <section className="border-b border-line bg-paper-dim">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:px-8 lg:grid-cols-4 lg:py-14">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
