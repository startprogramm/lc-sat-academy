import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — LC SAT Academy",
  description: "Get in touch with the LC SAT Academy team.",
};

const CONTACT_EMAIL = "support@satacademygulistan.uz";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        Contact
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-7 text-ink-soft">
        Questions about practice tests, the question bank, or setting up a
        classroom — reach out and we&apos;ll get back to you.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-6 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
      >
        <Mail className="h-5 w-5 text-brand" strokeWidth={2} />
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}
