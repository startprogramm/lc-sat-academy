import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getQuestionBankMeta } from "@/db/queries";
import { QuestionBankApp } from "@/components/question-bank/question-bank-app";

export default async function QuestionBankPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const meta = await getQuestionBankMeta();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Question bank
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        Drill by topic
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        Pick a subject, a skill, and a difficulty, then work through
        questions one at a time with instant feedback and explanations.
      </p>

      {meta.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-ink-soft">
          No questions available yet — check back once a practice test is
          published.
        </div>
      ) : (
        <QuestionBankApp meta={meta} />
      )}
    </div>
  );
}
