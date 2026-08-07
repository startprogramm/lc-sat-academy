import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ClipboardList, Clock } from "lucide-react";
import { auth } from "@/auth";
import { getPracticeTestBySlug, getLatestAttemptForTest } from "@/db/queries";
import { startAttempt } from "@/app/actions/practice-test";

const SECTION_LABELS: Record<string, string> = {
  reading_writing: "Reading and Writing",
  math: "Math",
};

export default async function PracticeTestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug } = await params;
  const test = await getPracticeTestBySlug(slug);
  if (!test || !test.isPublished) notFound();

  const attempt = await getLatestAttemptForTest(session.user.id, test.id);
  if (attempt?.status === "in_progress") {
    redirect(`/test-session/${attempt.id}`);
  }

  const totalMinutes = Math.round(
    test.modules.reduce((sum, m) => sum + m.timeLimitSeconds, 0) / 60,
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-12">
      <Link
        href="/practice-tests"
        className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        ← All practice tests
      </Link>

      <span className="mt-6 block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Practice test
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        {test.title}
      </h1>
      {test.description ? (
        <p className="mt-3 text-ink-soft">{test.description}</p>
      ) : null}

      <div className="mt-8 rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <Clock className="h-4 w-4 text-brand" strokeWidth={2} />
          <span className="text-sm font-semibold text-ink">
            Standard time · ~{totalMinutes} minutes total
          </span>
        </div>
        <ul className="mt-4 space-y-3">
          {test.modules.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-ink">
                {SECTION_LABELS[m.section]} · Module {m.moduleNumber}
              </span>
              <span className="font-mono text-ink-soft">
                {m.questionCount} questions ·{" "}
                {Math.round(m.timeLimitSeconds / 60)} min
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-line bg-white p-5 text-sm text-ink-soft">
        <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
        <p>
          Each module is timed on its own. Once a module&apos;s time is up,
          you&apos;ll move on automatically — you can&apos;t return to a
          previous module. There&apos;s a 10-minute break between Reading and
          Writing and Math.
        </p>
      </div>

      <form
        action={async () => {
          "use server";
          await startAttempt(test.id);
        }}
        className="mt-8"
      >
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
        >
          Start test
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  );
}
