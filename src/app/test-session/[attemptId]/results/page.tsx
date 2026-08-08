import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Check, X as XIcon } from "lucide-react";
import { auth } from "@/auth";
import { Logo } from "@/components/logo";
import { getAttemptResults } from "@/db/queries";
import { getSectionScoreRange, getTotalScoreRange, isExactTableFit } from "@/lib/sat-scoring";

const SECTION_LABELS: Record<string, string> = {
  reading_writing: "Reading and Writing",
  math: "Math",
};

export default async function TestResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { attemptId } = await params;
  const results = await getAttemptResults(attemptId, session.user.id);
  if (!results) notFound();

  const percent =
    results.overall.total > 0
      ? Math.round((results.overall.correct / results.overall.total) * 100)
      : 0;

  const rwScore = getSectionScoreRange(
    results.readingWriting.correct,
    results.readingWriting.total,
    "reading_writing",
  );
  const mathScore = getSectionScoreRange(results.math.correct, results.math.total, "math");
  const totalScore = getTotalScoreRange(
    results.readingWriting.correct,
    results.readingWriting.total,
    results.math.correct,
    results.math.total,
  );
  const isExactScoring =
    isExactTableFit(results.readingWriting.total, "reading_writing") &&
    isExactTableFit(results.math.total, "math");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/dashboard">
            <Logo markClassName="h-7 w-7" />
          </Link>
          <Link
            href="/practice-tests"
            className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            All practice tests
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-12">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          Results
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          {results.testTitle}
        </h1>

        <div className="mt-8 rounded-2xl border border-line bg-ink p-6 text-paper">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-paper/60">
            Estimated SAT score
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {totalScore.lower}–{totalScore.upper}
            <span className="ml-2 text-base font-normal text-paper/60">/ 1600</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm text-paper/80">
            <span>
              Reading and Writing: {rwScore.lower}–{rwScore.upper}
            </span>
            <span>
              Math: {mathScore.lower}–{mathScore.upper}
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-mono text-4xl font-semibold tracking-tight text-ink">
              {results.overall.correct}
              <span className="text-lg text-ink-soft">
                /{results.overall.total}
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Overall · {percent}% correct
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-mono text-4xl font-semibold tracking-tight text-ink">
              {results.readingWriting.correct}
              <span className="text-lg text-ink-soft">
                /{results.readingWriting.total}
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">Reading and Writing</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-mono text-4xl font-semibold tracking-tight text-ink">
              {results.math.correct}
              <span className="text-lg text-ink-soft">
                /{results.math.total}
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">Math</p>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-soft">
          {isExactScoring
            ? "Estimated using College Board's official simplified raw-score conversion table. Actual scoring on the real exam uses adaptive, question-level scoring and may differ."
            : "Estimated by proportionally mapping this test's raw score onto College Board's official simplified conversion table (calibrated for a different question count), then applying that curve. Treat this as a rough guide, not a precise prediction — actual scoring on the real exam uses adaptive, question-level scoring."}
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">
          Review
        </h2>

        <div className="mt-4 space-y-10">
          {results.modules.map((m) => (
            <div key={m.id}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {SECTION_LABELS[m.section]} · Module {m.moduleNumber}
              </h3>

              <div className="mt-3 space-y-4">
                {m.questions.map((q, i) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-line bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-ink-soft">
                        Question {i + 1} · {q.topic}
                      </span>
                      {q.wasAnswered ? (
                        q.isCorrect ? (
                          <span className="flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 font-mono text-xs font-semibold text-forest">
                            <Check className="h-3 w-3" strokeWidth={3} />
                            Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                            <XIcon className="h-3 w-3" strokeWidth={3} />
                            Incorrect
                          </span>
                        )
                      ) : (
                        <span className="rounded-full bg-paper-dim px-2 py-0.5 font-mono text-xs font-semibold text-ink-soft">
                          Not answered
                        </span>
                      )}
                    </div>

                    {q.stimulus ? (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink-soft">
                        {q.stimulus}
                      </p>
                    ) : null}
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink">
                      {q.stem}
                    </p>

                    {q.type === "multiple_choice" ? (
                      <div className="mt-4 space-y-2">
                        {q.choices.map((choice) => {
                          const isSelected =
                            q.response?.selectedChoiceId === choice.id;
                          const isCorrectChoice = choice.id === q.correctChoiceId;
                          return (
                            <div
                              key={choice.id}
                              className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${
                                isCorrectChoice
                                  ? "border-forest bg-forest/5"
                                  : isSelected
                                    ? "border-accent bg-accent/5"
                                    : "border-line"
                              }`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                                  isCorrectChoice
                                    ? "border-forest text-forest"
                                    : isSelected
                                      ? "border-accent text-accent"
                                      : "border-line text-ink-soft"
                                }`}
                              >
                                {choice.label}
                              </span>
                              <span className="pt-0.5 text-ink">
                                {choice.body}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-4 flex flex-wrap gap-6 text-sm">
                        <p>
                          <span className="text-ink-soft">Your answer: </span>
                          <span className="font-mono text-ink">
                            {q.response?.responseText || "—"}
                          </span>
                        </p>
                        <p>
                          <span className="text-ink-soft">
                            Correct answer:{" "}
                          </span>
                          <span className="font-mono text-forest">
                            {q.correctResponse}
                          </span>
                        </p>
                      </div>
                    )}

                    {q.explanation ? (
                      <p className="mt-4 rounded-xl bg-paper-dim p-4 text-sm leading-6 text-ink-soft">
                        {q.explanation}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
          <Link
            href="/practice-tests"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
          >
            Back to practice tests
          </Link>
        </div>
      </div>
    </div>
  );
}
