import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — LC SAT Academy",
  description:
    "Free diagnostic, or unlock full-length practice tests, the full question bank, and 1:1 coaching. Plans from $0 to $25/month.",
};

type Plan = {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  cta: string;
  highlight?: boolean;
  badge?: string;
  featuresIntro?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Free",
    tagline: "See where you stand.",
    price: "$0",
    priceNote: "forever",
    cta: "Start free",
    features: [
      "1 diagnostic sample test (24 questions, all 4 modules)",
      "Raw score results after every attempt",
      "Preview of the question bank",
      "Progress dashboard — tests taken, questions answered",
    ],
  },
  {
    name: "Standard",
    tagline: "The real test, on repeat.",
    price: "$10",
    priceNote: "/ month",
    cta: "Get Standard",
    features: [
      "Everything in Free",
      "Every full-length practice test (98 questions, real digital SAT timing)",
      "Official-style scaled score estimate (200–1600) after every test",
      "Unlimited retakes on every test",
      "Full question bank, filterable by topic and difficulty",
    ],
  },
  {
    name: "Pro",
    tagline: "Know exactly what to fix.",
    price: "$15",
    priceNote: "/ month",
    cta: "Get Pro",
    highlight: true,
    badge: "Most popular",
    features: [
      "Everything in Standard",
      "Section- and topic-level weak-area breakdown",
      "Score trend tracking across every attempt",
      "New practice tests unlocked first",
      "Build custom timed drills from the question bank",
    ],
  },
  {
    name: "Max",
    tagline: "VIP. Everything, plus a coach.",
    price: "$25",
    priceNote: "/ month",
    cta: "Get Max",
    features: [
      "Everything in Pro",
      "Monthly 1:1 session with an SAT coach",
      "Personalized study plan built around your weak areas",
      "Written feedback on Reading & Writing responses",
      "Priority support with same-day response",
      "Early access to new tests and features",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          Pricing
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
          Pick your pace
        </h1>
        <p className="mt-4 text-lg leading-7 text-ink-soft">
          Start free with a short diagnostic. Upgrade when you&apos;re ready
          for full-length tests, the full question bank, or a coach in your
          corner. Cancel anytime — no contracts.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              plan.highlight
                ? "border-accent bg-ink text-paper shadow-lg shadow-accent/10"
                : "border-line bg-white text-ink"
            }`}
          >
            {plan.badge ? (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-paper">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {plan.badge}
              </span>
            ) : null}

            <h2 className="font-display text-xl font-bold uppercase tracking-tight">
              {plan.name}
            </h2>
            <p
              className={`mt-1 text-sm ${plan.highlight ? "text-paper/70" : "text-ink-soft"}`}
            >
              {plan.tagline}
            </p>

            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-extrabold tracking-tight">
                {plan.price}
              </span>
              <span
                className={`font-mono text-xs ${plan.highlight ? "text-paper/60" : "text-ink-soft"}`}
              >
                {plan.priceNote}
              </span>
            </div>

            <Link
              href="/signup"
              className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-accent text-paper hover:bg-accent/90"
                  : "bg-ink text-paper hover:bg-ink/90"
              }`}
            >
              {plan.cta}
              <span aria-hidden="true">→</span>
            </Link>

            <ul className="mt-7 space-y-3 text-sm leading-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-accent" : "text-forest"}`}
                    strokeWidth={2.5}
                  />
                  <span className={plan.highlight ? "text-paper/90" : "text-ink"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-xs text-ink-soft">
        Prices in USD, billed monthly. Every plan includes access on any
        device. Upgrade, downgrade, or cancel whenever you want — changes
        apply to your next billing cycle.
      </p>
    </div>
  );
}
