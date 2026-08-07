import type { Metadata } from "next";
import { Users } from "lucide-react";
import { auth } from "@/auth";
import { FeaturePage } from "@/components/feature-page";

export const metadata: Metadata = {
  title: "For classrooms — LC SAT Academy",
  description:
    "Assign practice tests and question sets, and track a whole roster's scores and weak areas in one place.",
};

export default async function ClassroomsFeaturePage() {
  const session = await auth();

  return (
    <FeaturePage
      eyebrow="For classrooms"
      title="Built for teachers and tutors too"
      body="Assign tests, track a whole roster, and see where a class is stuck — without spreadsheets."
      icon={Users}
      signedIn={!!session?.user}
      bullets={[
        "Assign practice tests and question sets to a class or a single student",
        "See roster-wide score trends and weak areas at a glance",
        "Works alongside individual student accounts — no separate logins",
        "Built for tutors and classroom teachers, not just self-study",
      ]}
    />
  );
}
