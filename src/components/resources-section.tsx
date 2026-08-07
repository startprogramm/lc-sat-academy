import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export function ResourcesSection() {
  return (
    <section id="resources" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
            Study smarter
          </h2>
          <Link
            href="/resources"
            className="text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            All resources →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group block border-t border-line pt-6"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
                {article.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
