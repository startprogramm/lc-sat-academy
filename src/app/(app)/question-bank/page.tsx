import { BookOpen } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function QuestionBankPage() {
  return (
    <ComingSoon
      eyebrow="Question bank"
      title="Drill by topic"
      body="Browse and practice individual questions filtered by subject, skill, and difficulty."
      icon={BookOpen}
      bullets={[
        "Reading & Writing and Math, by topic",
        "Every question comes with an explanation",
        "Filter by difficulty as you improve",
      ]}
    />
  );
}
