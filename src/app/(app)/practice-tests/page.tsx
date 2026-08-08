import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { auth } from "@/auth";
import { getPublishedPracticeTests, getLatestAttemptForTest } from "@/db/queries";

const SECTION_LABELS: Record<string, string> = {
  reading_writing: "Reading & Writing",
  math: "Math",
};

export default async function PracticeTestsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tests = await getPublishedPracticeTests();
  const attempts = await Promise.all(
    tests.map((test) => getLatestAttemptForTest(session.user.id, test.id)),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Practice tests
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        Practice tests
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        Timed, module by module, just like the real digital SAT. Full-length
        tests match the real question count; shorter samples are marked so
        you know what you&apos;re taking.
      </p>

      {tests.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-6 rounded-2xl border border-dashed border-line bg-white p-8 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10">
            <ClipboardList className="h-6 w-6 text-brand" strokeWidth={2} />
          </div>
          <div>
            <p className="font-semibold text-ink">No tests published yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Check back soon — new practice tests are on the way.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tests.map((test, i) => {
            const attempt = attempts[i];
            const status = attempt?.status;
            return (
              <div
                key={test.id}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {!test.isFullLength ? (
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
                      Shorter sample
                    </span>
                  ) : null}
                  {test.sections.map((section) => (
                    <span
                      key={section}
                      className="rounded-full bg-paper-dim px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
                    >
                      {SECTION_LABELS[section] ?? section}
                    </span>
                  ))}
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-ink">
                  {test.title}
                </h2>
                {test.description ? (
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {test.description}
                  </p>
                ) : null}
                <p className="mt-3 font-mono text-xs text-ink-soft">
                  {test.totalQuestions} questions · ~{test.totalMinutes} min
                </p>

                <Link
                  href={
                    status === "in_progress"
                      ? `/test-session/${attempt!.id}`
                      : status === "completed"
                        ? `/test-session/${attempt!.id}/results`
                        : `/practice-tests/${test.slug}`
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
                >
                  {status === "in_progress"
                    ? "Resume test"
                    : status === "completed"
                      ? "View results"
                      : "Start test"}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
