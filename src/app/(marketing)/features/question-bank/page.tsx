import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { auth } from "@/auth";
import { FeaturePage } from "@/components/feature-page";

export const metadata: Metadata = {
  title: "Question bank — LC SAT Academy",
  description:
    "2,400+ Reading & Writing and Math questions, filtered by subject, skill, and difficulty, each with a full explanation.",
};

export default async function QuestionBankFeaturePage() {
  const session = await auth();

  return (
    <FeaturePage
      eyebrow="Question bank"
      title="Drill by topic until it clicks"
      body="Browse thousands of Reading & Writing and Math questions, filtered by subject, skill, and difficulty — each with a full explanation, not just an answer key."
      icon={BookOpen}
      signedIn={!!session?.user}
      bullets={[
        "2,400+ questions across Reading & Writing and Math",
        "Filter by subject, skill, and difficulty as you improve",
        "Every question includes an explanation that teaches the underlying skill",
        "Missed questions are queued for review automatically",
      ]}
    />
  );
}
