import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — LC SAT Academy",
  description: "How LC SAT Academy collects, uses, and protects your data.",
};

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "When you create an account, we collect your name, email address, and, if you sign in with Google, basic profile information from your Google account. We also store the practice tests and questions you complete so we can show your progress and score history.",
  },
  {
    heading: "How we use your information",
    body: "We use your information to run your account, save your practice test and question bank activity, and show you score trends and weak-area breakdowns. If you're part of a classroom, your teacher or tutor can see your progress within that classroom.",
  },
  {
    heading: "Data storage and security",
    body: "Account and progress data is stored in a managed Postgres database. Passwords are never stored in plain text — they're hashed before being saved. We use industry-standard practices to protect your data, but no system is completely immune to risk.",
  },
  {
    heading: "Sharing your information",
    body: "We don't sell your personal information. We only share data with the service providers necessary to run the site (such as our hosting and database providers), and only to the extent needed to operate the product.",
  },
  {
    heading: "Your choices",
    body: "You can update your profile information at any time from your account settings, or contact us to request that your account and associated data be deleted.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-20">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
        Legal
      </span>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        Privacy Policy
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
