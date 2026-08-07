import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAttemptForRunner } from "@/db/queries";
import { TestRunner } from "@/components/test-runner/test-runner";

export default async function TestSessionPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { attemptId } = await params;
  const data = await getAttemptForRunner(attemptId, session.user.id);
  if (!data) notFound();

  if (data.status === "completed") {
    redirect(`/test-session/${attemptId}/results`);
  }

  if (!data.currentModuleId) notFound();

  const initialResponses = Object.fromEntries(
    data.existingResponses.map((r) => [
      r.questionId,
      {
        selectedChoiceId: r.selectedChoiceId,
        responseText: r.responseText,
        markedForReview: r.markedForReview,
      },
    ]),
  );

  return (
    <TestRunner
      attemptId={data.attemptId}
      testTitle={data.testTitle}
      modules={data.modules}
      initialResponses={initialResponses}
      initialModuleId={data.currentModuleId}
    />
  );
}
