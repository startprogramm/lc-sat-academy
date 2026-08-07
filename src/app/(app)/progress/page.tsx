import Link from "next/link";
import { redirect } from "next/navigation";
import { LineChart, ClipboardCheck, BookOpenCheck } from "lucide-react";
import { auth } from "@/auth";
import { getUserStats } from "@/db/queries";

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const stats = await getUserStats(session.user.id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Progress
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        Your progress
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        Score history and weak-area breakdowns, tracked test by test.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5">
          <ClipboardCheck className="h-5 w-5 text-brand" strokeWidth={2} />
          <div className="mt-3 font-mono text-3xl font-semibold text-ink">
            {stats.testsCompleted}
          </div>
          <div className="mt-1 text-xs text-ink-soft">Tests completed</div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <BookOpenCheck className="h-5 w-5 text-brand" strokeWidth={2} />
          <div className="mt-3 font-mono text-3xl font-semibold text-ink">
            {stats.questionsAnswered}
          </div>
          <div className="mt-1 text-xs text-ink-soft">Questions answered</div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-6 rounded-2xl border border-dashed border-line bg-white p-8 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10">
          <LineChart className="h-6 w-6 text-brand" strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold text-ink">
            {stats.testsCompleted === 0
              ? "No score history yet"
              : "Score trend chart coming soon"}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {stats.testsCompleted === 0
              ? "Take your first practice test and your score trend, section breakdown, and weak areas will show up here."
              : "We're still building the score trend and weak-area breakdown views."}
          </p>
          {stats.testsCompleted === 0 ? (
            <Link
              href="/practice-tests"
              className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
            >
              Browse practice tests →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
