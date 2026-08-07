import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { auth } from "@/auth";
import { FeaturePage } from "@/components/feature-page";

export const metadata: Metadata = {
  title: "Practice tests — LC SAT Academy",
  description:
    "Full-length, adaptive digital SAT practice tests timed like the real Bluebook app, auto-scored the second you submit.",
};

export default async function PracticeTestsFeaturePage() {
  const session = await auth();

  return (
    <FeaturePage
      eyebrow="Practice tests"
      title="Full-length practice tests, timed like test day"
      body="Every practice test mirrors the real digital SAT: two adaptive modules per section, Bluebook-style timing, and instant scoring the moment you submit."
      icon={ClipboardList}
      signedIn={!!session?.user}
      bullets={[
        "14 full-length practice tests, each with two adaptive modules per section",
        "Timing and pacing that matches the real Bluebook app",
        "Auto-scored the second you submit — no waiting on results",
        "Every attempt saved to your dashboard so you can track improvement over time",
      ]}
    />
  );
}
