import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

type ProductSpotlightProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  signedIn: boolean;
  visual: ReactNode;
  reverse?: boolean;
};

export function ProductSpotlight({
  id,
  eyebrow,
  title,
  body,
  bullets,
  signedIn,
  visual,
  reverse,
}: ProductSpotlightProps) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
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

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm leading-6 text-ink-soft"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest"
                    strokeWidth={2.5}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

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

          <div className={reverse ? "lg:order-1" : undefined}>{visual}</div>
        </div>
      </div>
    </section>
  );
}
