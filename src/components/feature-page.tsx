import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

type FeaturePageProps = {
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  bullets: string[];
  signedIn: boolean;
};

export function FeaturePage({
  eyebrow,
  title,
  body,
  icon: Icon,
  bullets,
  signedIn,
}: FeaturePageProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        {eyebrow}
      </span>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-7 text-ink-soft">{body}</p>

      <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10">
          <Icon className="h-6 w-6 text-brand" strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold text-ink">What&apos;s included</p>
          <ul className="mt-3 space-y-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm leading-6 text-ink-soft"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-forest"
                  strokeWidth={2.5}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {signedIn ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
          >
            Go to your dashboard
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
            >
              Start practicing free
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
