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

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group relative block overflow-hidden rounded-xl border border-line bg-white p-6 pt-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(20,23,28,0.4)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-6 w-6 bg-paper-dim [clip-path:polygon(100%_0,0_0,100%_100%)] transition-colors duration-300 group-hover:bg-pencil/40"
              />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
                {article.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {article.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft transition-colors group-hover:text-ink">
                Read
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
