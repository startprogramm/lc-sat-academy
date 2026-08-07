import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — LC SAT Academy",
  description:
    "Why LC SAT Academy is built from the ground up for the digital, adaptive SAT.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        About
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Built for the digital SAT, not the old one.
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-8 text-ink-soft">
        <p>
          The SAT changed — shorter, adaptive, and taken on a screen. Most
          prep material didn&apos;t catch up. LC SAT Academy is built from
          the ground up for the digital, adaptive format: realistic
          Bluebook-style timing, module-by-module difficulty, and practice
          that tells you exactly which skills are costing you points.
        </p>
        <p>
          No generic worksheets. Every practice test behaves like the real
          thing, and every question comes with an explanation that teaches
          the underlying skill, not just the right answer.
        </p>
        <p>
          We built LC SAT Academy for students who want a straight answer to
          &quot;what should I study next,&quot; and for teachers and tutors
          who need to see that answer across an entire classroom, not just
          one student at a time.
        </p>
      </div>
    </div>
  );
}
