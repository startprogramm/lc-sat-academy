import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} — LC SAT Academy`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-20">
      <Link
        href="/resources"
        className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        ← All resources
      </Link>

      <span className="mt-6 block font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        {article.tag}
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-8 space-y-6 border-t border-line pt-8">
        {article.sections.map((section) => (
          <div key={section.heading ?? section.body}>
            {section.heading ? (
              <h2 className="mb-2 font-display text-lg font-bold text-ink">
                {section.heading}
              </h2>
            ) : null}
            <p className="text-base leading-7 text-ink-soft">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
        >
          Start practicing free
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
