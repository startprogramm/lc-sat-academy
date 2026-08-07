import type { LucideIcon } from "lucide-react";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  bullets: string[];
};

export function ComingSoon({
  eyebrow,
  title,
  body,
  icon: Icon,
  bullets,
}: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {eyebrow}
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">{body}</p>

      <div className="mt-8 flex flex-col items-start gap-6 rounded-2xl border border-dashed border-line bg-white p-8 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10">
          <Icon className="h-6 w-6 text-brand" strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold text-ink">Coming soon</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
            {bullets.map((bullet) => (
              <li key={bullet}>· {bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
