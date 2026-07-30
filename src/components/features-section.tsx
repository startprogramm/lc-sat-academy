const FEATURES = [
  {
    color: "var(--brand)",
    title: "Full-length practice tests",
    body: "Timed, scored, and adaptive across two modules per section — just like test day.",
  },
  {
    color: "var(--accent)",
    title: "Question bank by topic",
    body: "Drill by subject, skill, and difficulty. Every question comes with an explanation, not just an answer.",
  },
  {
    color: "var(--forest)",
    title: "Score tracking",
    body: "Watch your score climb by section and skill, and know exactly what to study next.",
  },
  {
    color: "var(--pencil)",
    title: "For classrooms",
    body: "Teachers and tutors can assign tests, track a whole roster, and see where a class is stuck.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <h2 className="max-w-lg font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
          Everything you need to hit your number.
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="border-t border-line pt-6">
              <span
                className="block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: feature.color }}
              />
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-sm text-base leading-7 text-ink-soft">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
