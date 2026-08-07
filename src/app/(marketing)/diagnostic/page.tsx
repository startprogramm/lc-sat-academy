import type { Metadata } from "next";
import { Target } from "lucide-react";
import { auth } from "@/auth";
import { FeaturePage } from "@/components/feature-page";

export const metadata: Metadata = {
  title: "Diagnostic test — LC SAT Academy",
  description:
    "One full-length, adaptive diagnostic test that sets an honest baseline score before you start prepping.",
};

export default async function DiagnosticPage() {
  const session = await auth();

  return (
    <FeaturePage
      eyebrow="Diagnostic test"
      title="Start with a real baseline score"
      body="One full-length, Bluebook-style test that adapts to you — the same way the real digital SAT does — so your first score is an honest starting point, not a guess."
      icon={Target}
      signedIn={!!session?.user}
      bullets={[
        "Same adaptive, two-module format as the real exam",
        "Scored immediately, with a section-by-section breakdown",
        "Sets your baseline — every practice test after this tracks improvement from here",
        "Free, no credit card required",
      ]}
    />
  );
}
