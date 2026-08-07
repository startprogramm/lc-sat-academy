import type { Metadata } from "next";
import { LineChart } from "lucide-react";
import { auth } from "@/auth";
import { FeaturePage } from "@/components/feature-page";

export const metadata: Metadata = {
  title: "Progress tracking — LC SAT Academy",
  description:
    "Score history, section breakdowns, and weak-area tracking updated after every practice test and question set.",
};

export default async function ProgressFeaturePage() {
  const session = await auth();

  return (
    <FeaturePage
      eyebrow="Progress"
      title="See exactly what's costing you points"
      body="Score history, section breakdowns, and weak-area tracking — updated after every practice test and question set you complete."
      icon={LineChart}
      signedIn={!!session?.user}
      bullets={[
        "Score trend across every full-length test you take",
        "Section-by-section and skill-by-skill breakdowns",
        "Weak areas surfaced automatically so you know what to study next",
        "One dashboard for every attempt, from your first diagnostic to test day",
      ]}
    />
  );
}
