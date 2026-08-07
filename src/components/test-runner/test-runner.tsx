"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, Eye, Flag } from "lucide-react";
import { Logo } from "@/components/logo";
import { formatCountdown, useCountdown } from "@/lib/use-countdown";
import { advanceModule, saveResponse } from "@/app/actions/practice-test";
import { QuestionNavigator } from "./question-navigator";
import { ReferenceSheet } from "./reference-sheet";

type QuestionData = {
  id: string;
  type: "multiple_choice" | "student_response";
  topic: string;
  stimulus: string | null;
  stem: string;
  choices: { id: string; label: string; body: string }[];
};

type ModuleData = {
  id: string;
  section: "reading_writing" | "math";
  moduleNumber: number;
  orderIndex: number;
  timeLimitSeconds: number;
  questions: QuestionData[];
};

type ResponseState = {
  selectedChoiceId: string | null;
  responseText: string | null;
  markedForReview: boolean;
};

type TestRunnerProps = {
  attemptId: string;
  testTitle: string;
  modules: ModuleData[];
  initialResponses: Record<string, ResponseState>;
  initialModuleId: string;
};

const SECTION_LABELS: Record<ModuleData["section"], string> = {
  reading_writing: "Reading and Writing",
  math: "Math",
};

const EMPTY_RESPONSE: ResponseState = {
  selectedChoiceId: null,
  responseText: null,
  markedForReview: false,
};

const BREAK_SECONDS = 10 * 60;

export function TestRunner({
  attemptId,
  testTitle,
  modules,
  initialResponses,
  initialModuleId,
}: TestRunnerProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [currentModuleId, setCurrentModuleId] = useState(initialModuleId);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] =
    useState<Record<string, ResponseState>>(initialResponses);
  const [phase, setPhase] = useState<"module" | "module-end" | "break">(
    "module",
  );
  const pendingNextModuleIdRef = useRef<string | null>(null);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [timerHidden, setTimerHidden] = useState(false);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const currentModule = modules.find((m) => m.id === currentModuleId);
  const question = currentModule?.questions[questionIndex];

  const getResponse = (questionId: string): ResponseState =>
    responses[questionId] ?? EMPTY_RESPONSE;

  const persist = useCallback(
    (questionId: string, next: ResponseState) => {
      setResponses((prev) => ({ ...prev, [questionId]: next }));
      startTransition(() => {
        void saveResponse(attemptId, questionId, next);
      });
    },
    [attemptId, startTransition],
  );

  const handleSelectChoice = (choiceId: string) => {
    if (!question) return;
    persist(question.id, { ...getResponse(question.id), selectedChoiceId: choiceId });
  };

  const handleResponseTextChange = (text: string) => {
    if (!question) return;
    persist(question.id, { ...getResponse(question.id), responseText: text });
  };

  const handleToggleMark = () => {
    if (!question) return;
    const current = getResponse(question.id);
    persist(question.id, { ...current, markedForReview: !current.markedForReview });
  };

  const handleModuleExpire = useCallback(() => {
    setPhase((p) => (p === "module" ? "module-end" : p));
  }, []);

  const resumeFromBreak = useCallback(() => {
    const pending = pendingNextModuleIdRef.current;
    if (pending) {
      pendingNextModuleIdRef.current = null;
      setCurrentModuleId(pending);
      setQuestionIndex(0);
      setPhase("module");
    }
  }, []);

  const timeLeft = useCountdown(
    currentModule ? `${attemptId}:${currentModule.id}` : "no-module",
    currentModule?.timeLimitSeconds ?? 0,
    handleModuleExpire,
  );

  const breakSecondsLeft = useCountdown(
    `${attemptId}:break`,
    BREAK_SECONDS,
    resumeFromBreak,
  );

  const handleBack = () => setQuestionIndex((i) => Math.max(0, i - 1));

  const handleNext = () => {
    if (!currentModule || !question) return;
    const isLast = questionIndex === currentModule.questions.length - 1;
    if (!isLast) {
      setQuestionIndex((i) => i + 1);
      return;
    }
    const unanswered = currentModule.questions.filter((q) => {
      const r = getResponse(q.id);
      return !r.selectedChoiceId && !r.responseText;
    }).length;
    if (unanswered > 0) {
      setShowUnansweredWarning(true);
      return;
    }
    setPhase("module-end");
  };

  const handleContinueFromModuleEnd = async () => {
    setFinishing(true);
    const result = await advanceModule(attemptId);
    if (result.done) {
      router.push(`/test-session/${attemptId}/results`);
      return;
    }
    setFinishing(false);
    if (result.nextSection !== result.previousSection) {
      pendingNextModuleIdRef.current = result.nextModuleId;
      setPhase("break");
    } else {
      setCurrentModuleId(result.nextModuleId);
      setQuestionIndex(0);
      setPhase("module");
    }
  };

  if (!currentModule) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-ink-soft">
        This test attempt couldn&apos;t be loaded.
      </div>
    );
  }

  if (phase === "break") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          Break
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase text-ink">
          Take a 10-minute break
        </h1>
        <p className="mt-4 font-mono text-5xl font-semibold tabular-nums text-ink">
          {formatCountdown(breakSecondsLeft)}
        </p>
        <p className="mt-4 max-w-sm text-sm text-ink-soft">
          Math starts automatically when the break ends, or resume now if
          you&apos;re ready.
        </p>
        <button
          type="button"
          onClick={resumeFromBreak}
          className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
        >
          Resume now
        </button>
      </div>
    );
  }

  if (phase === "module-end") {
    const answeredCount = currentModule.questions.filter((q) => {
      const r = getResponse(q.id);
      return !!(r.selectedChoiceId || r.responseText);
    }).length;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          {SECTION_LABELS[currentModule.section]} · Module{" "}
          {currentModule.moduleNumber}
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase text-ink">
          Module complete
        </h1>
        <p className="mt-4 text-ink-soft">
          {answeredCount} of {currentModule.questions.length} questions
          answered.
        </p>
        <button
          type="button"
          onClick={handleContinueFromModuleEnd}
          disabled={finishing}
          className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {finishing ? "Loading…" : "Continue"}
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-ink-soft">
        This module has no questions yet.
      </div>
    );
  }

  const response = getResponse(question.id);
  const unansweredCount = currentModule.questions.filter((q) => {
    const r = getResponse(q.id);
    return !r.selectedChoiceId && !r.responseText;
  }).length;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Logo markClassName="h-6 w-6" withWordmark={false} />
            <span className="hidden text-sm font-semibold text-ink sm:inline">
              {testTitle}
            </span>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
              {SECTION_LABELS[currentModule.section]}
            </p>
            <p className="font-mono text-[11px] text-ink-soft">
              Module {currentModule.moduleNumber}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {currentModule.section === "math" ? (
              <button
                type="button"
                onClick={() => setReferenceOpen(true)}
                className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink sm:flex"
              >
                <BookOpen className="h-3.5 w-3.5" strokeWidth={2} />
                Reference
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setTimerHidden((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink"
            >
              {timerHidden ? (
                <>
                  <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                  Show
                </>
              ) : (
                <>
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  {formatCountdown(timeLeft)}
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-8 sm:px-6">
        <div
          className={
            question.stimulus
              ? "grid gap-8 lg:grid-cols-2 lg:items-start"
              : "mx-auto max-w-2xl"
          }
        >
          {question.stimulus ? (
            <div className="whitespace-pre-line rounded-2xl border border-line bg-white p-6 text-base leading-7 text-ink lg:sticky lg:top-24">
              {question.stimulus}
            </div>
          ) : null}

          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-paper">
                {questionIndex + 1}
              </span>
              <button
                type="button"
                onClick={handleToggleMark}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                  response.markedForReview
                    ? "border-pencil text-ink"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                <Flag
                  className={`h-3.5 w-3.5 ${response.markedForReview ? "fill-pencil text-pencil" : ""}`}
                  strokeWidth={2}
                />
                Mark for Review
              </button>
            </div>

            <p className="mt-5 whitespace-pre-line text-base leading-7 text-ink">
              {question.stem}
            </p>

            {question.type === "multiple_choice" ? (
              <div className="mt-6 space-y-3">
                {question.choices.map((choice) => {
                  const selected = response.selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleSelectChoice(choice.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                        selected
                          ? "border-brand bg-brand/5"
                          : "border-line hover:border-ink"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                          selected
                            ? "border-brand bg-brand text-paper"
                            : "border-line text-ink-soft"
                        }`}
                      >
                        {choice.label}
                      </span>
                      <span className="pt-0.5 text-ink">{choice.body}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6">
                <label
                  htmlFor="spr-answer"
                  className="font-mono text-xs uppercase tracking-wide text-ink-soft"
                >
                  Your answer
                </label>
                <input
                  id="spr-answer"
                  type="text"
                  inputMode="decimal"
                  value={response.responseText ?? ""}
                  onChange={(e) => handleResponseTextChange(e.target.value)}
                  placeholder="Enter your answer"
                  className="mt-2 w-40 rounded-lg border border-line px-3.5 py-2.5 font-mono text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={questionIndex === 0}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors enabled:hover:border-ink disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => setNavigatorOpen(true)}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-ink"
          >
            Question {questionIndex + 1} of {currentModule.questions.length}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
          >
            {questionIndex === currentModule.questions.length - 1
              ? "Next module"
              : "Next"}
          </button>
        </div>
      </div>

      <QuestionNavigator
        open={navigatorOpen}
        onClose={() => setNavigatorOpen(false)}
        currentIndex={questionIndex}
        onSelect={(index) => setQuestionIndex(index)}
        questions={currentModule.questions.map((q) => {
          const r = getResponse(q.id);
          return {
            id: q.id,
            answered: !!(r.selectedChoiceId || r.responseText),
            markedForReview: r.markedForReview,
          };
        })}
      />

      <ReferenceSheet
        open={referenceOpen}
        onClose={() => setReferenceOpen(false)}
      />

      {showUnansweredWarning ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6">
          <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 text-center">
            <p className="font-semibold text-ink">
              You have unanswered questions
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {unansweredCount} question{unansweredCount === 1 ? "" : "s"} in
              this module {unansweredCount === 1 ? "hasn't" : "haven't"} been
              answered. You can still go back and answer them.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowUnansweredWarning(false)}
                className="rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUnansweredWarning(false);
                  setPhase("module-end");
                }}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
              >
                Continue anyway
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
