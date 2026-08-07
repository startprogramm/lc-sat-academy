import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

type ProductSpotlightProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  bullets: string[];
  signedIn: boolean;
  reverse?: boolean;
};

export function ProductSpotlight({
  id,
  eyebrow,
  title,
  body,
  icon: Icon,
  bullets,
  signedIn,
  reverse,
}: ProductSpotlightProps) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className={reverse ? "lg:order-2" : undefined}>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-7 text-ink-soft">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <div
            className={`rounded-2xl border border-line bg-white p-8 ${
              reverse ? "lg:order-1" : ""
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
              <Icon className="h-6 w-6 text-brand" strokeWidth={2} />
            </div>
            <p className="mt-4 font-semibold text-ink">What&apos;s included</p>
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
      </div>
    </section>
  );
}
