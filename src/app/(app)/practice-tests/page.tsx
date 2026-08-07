import { ClipboardList } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function PracticeTestsPage() {
  return (
    <ComingSoon
      eyebrow="Practice tests"
      title="Full-length practice tests"
      body="Timed, scored, and adaptive across two modules per section — just like test day."
      icon={ClipboardList}
      bullets={[
        "Realistic Bluebook-style timing per module",
        "Auto-scoring on submit",
        "Attempts saved to your dashboard",
      ]}
    />
  );
}
