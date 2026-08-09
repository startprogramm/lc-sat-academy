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

type SectionKey = "reading_writing" | "math";

function summarizeSection(
  modules: { section: string; questionCount: number; timeLimitSeconds: number }[],
  section: SectionKey,
) {
  const inSection = modules.filter((m) => m.section === section);
  return {
    questions: inSection.reduce((sum, m) => sum + m.questionCount, 0),
    minutes: Math.round(
      inSection.reduce((sum, m) => sum + m.timeLimitSeconds, 0) / 60,
    ),
  };
}

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

  const rwSummary = summarizeSection(test.modules, "reading_writing");
  const mathSummary = summarizeSection(test.modules, "math");
  const hasBothSections = rwSummary.questions > 0 && mathSummary.questions > 0;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-12">
      <Link
        href="/practice-tests"
        className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        ← All practice tests
      </Link>

      <div className="mt-6 flex items-center gap-2">
        <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
          Practice test
        </span>
        {!test.isFullLength ? (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
            Shorter sample
          </span>
        ) : null}
      </div>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        {test.title}
      </h1>
      {test.description ? (
        <p className="mt-3 text-ink-soft">{test.description}</p>
      ) : null}

      {!test.isFullLength ? (
        <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm leading-6 text-ink">
          This is a shorter, {test.totalQuestions}-question sample — not a
          full-length test. It&apos;s timed at the same pace as the real
          digital SAT, just with fewer questions per module, so treat it as a
          quick check-in rather than a full practice run.
        </div>
      ) : null}

      <div className="mt-8 rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <Clock className="h-4 w-4 text-brand" strokeWidth={2} />
          <span className="text-sm font-semibold text-ink">
            {test.isFullLength ? "Standard time" : "Sample timing"} · ~
            {totalMinutes} minutes total
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
          previous module.
          {hasBothSections
            ? " There's a 10-minute break between Reading and Writing and Math — unless you take just one section, in which case you can jump straight in."
            : ""}
        </p>
      </div>

      <div className="mt-8">
        <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {hasBothSections ? "Choose what to practice" : "Start"}
        </span>

        <div className={`mt-3 grid gap-4 ${hasBothSections ? "sm:grid-cols-3" : ""}`}>
          <form
            action={async () => {
              "use server";
              await startAttempt(test.id, null);
            }}
          >
            <button
              type="submit"
              className="flex h-full w-full flex-col items-start rounded-2xl border-2 border-accent bg-accent p-5 text-left transition-colors hover:bg-accent/90"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-paper/70">
                Full test
              </span>
              <span className="mt-2 font-display text-lg font-bold text-paper">
                Both sections
              </span>
              <span className="mt-1 text-xs text-paper/80">
                {test.totalQuestions} questions · ~{totalMinutes} min
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-paper">
                Start test
                <span aria-hidden="true">→</span>
              </span>
            </button>
          </form>

          {hasBothSections ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await startAttempt(test.id, "reading_writing");
                }}
              >
                <button
                  type="submit"
                  className="flex h-full w-full flex-col items-start rounded-2xl border border-line bg-white p-5 text-left transition-colors hover:border-ink"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
                    Reading &amp; Writing only
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-ink">
                    Just this section
                  </span>
                  <span className="mt-1 text-xs text-ink-soft">
                    {rwSummary.questions} questions · ~{rwSummary.minutes} min
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    Start
                    <span aria-hidden="true">→</span>
                  </span>
                </button>
              </form>

              <form
                action={async () => {
                  "use server";
                  await startAttempt(test.id, "math");
                }}
              >
                <button
                  type="submit"
                  className="flex h-full w-full flex-col items-start rounded-2xl border border-line bg-white p-5 text-left transition-colors hover:border-ink"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
                    Math only
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-ink">
                    Just this section
                  </span>
                  <span className="mt-1 text-xs text-ink-soft">
                    {mathSummary.questions} questions · ~{mathSummary.minutes} min
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    Start
                    <span aria-hidden="true">→</span>
                  </span>
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
