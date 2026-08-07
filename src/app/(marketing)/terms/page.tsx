import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — LC SAT Academy",
  description: "The terms that govern your use of LC SAT Academy.",
};

const SECTIONS = [
  {
    heading: "Using LC SAT Academy",
    body: "By creating an account, you agree to use LC SAT Academy for its intended purpose: practicing for the digital SAT. You're responsible for keeping your account credentials secure and for all activity under your account.",
  },
  {
    heading: "Accounts",
    body: "You must provide accurate information when creating an account. Accounts are personal and shouldn't be shared. If you're a student added to a classroom by a teacher or tutor, your progress within that classroom is visible to them.",
  },
  {
    heading: "Content",
    body: "Practice tests, questions, and explanations on LC SAT Academy are provided for personal study use. You may not copy, redistribute, or resell this content.",
  },
  {
    heading: "SAT trademark",
    body: "SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, LC SAT Academy.",
  },
  {
    heading: "Changes to the service",
    body: "We may update, add to, or remove features over time as the product develops. We'll do our best to keep your saved progress and score history intact through any changes.",
  },
  {
    heading: "Contact",
    body: "Questions about these terms can be sent to our contact page.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        Legal
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated August 2026</p>

      <div className="mt-10 space-y-8 border-t border-line pt-8">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-lg font-bold text-ink">
              {section.heading}
            </h2>
            <p className="mt-2 text-base leading-7 text-ink-soft">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
