import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Resources — LC SAT Academy",
  description:
    "Guides on how the digital SAT works, how to plan your prep, and where students lose the most points.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        Resources
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Study smarter
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-7 text-ink-soft">
        Guides on how the digital SAT actually works, how to plan your prep,
        and where students lose the most points.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="group block border-t border-line pt-6"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
              {article.tag}
            </span>
            <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand">
              {article.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {article.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
