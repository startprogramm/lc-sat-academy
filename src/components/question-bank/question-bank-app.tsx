"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { getDrillQuestions } from "@/app/actions/question-bank";
import { normalizeResponse } from "@/lib/normalize-response";
import { domainsForSection } from "@/lib/sat-domains";

type Section = "reading_writing" | "math";
type Difficulty = "easy" | "medium" | "hard";

type MetaRow = { section: Section; domain: string; difficulty: Difficulty; value: number };

type DrillQuestion = {
  id: string;
  type: "multiple_choice" | "student_response";
  topic: string;
  difficulty: Difficulty;
  stimulus: string | null;
  stem: string;
  correctResponse: string | null;
  explanation: string | null;
  choices: { id: string; label: string; body: string; isCorrect: boolean }[];
};

type AnswerState = {
  selectedChoiceId?: string;
  responseText?: string;
  checked: boolean;
  isCorrect: boolean;
};

const SECTION_LABELS: Record<Section, string> = {
  reading_writing: "Reading & Writing",
  math: "Math",
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const COUNT_OPTIONS = [5, 10, 15, 20];

export function QuestionBankApp({ meta }: { meta: MetaRow[] }) {
  const sections = useMemo(() => {
    const present = new Set(meta.map((m) => m.section));
    return (["reading_writing", "math"] as Section[]).filter((s) => present.has(s));
  }, [meta]);

  const [section, setSection] = useState<Section>(sections[0] ?? "reading_writing");
  const [domain, setDomain] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [questionCount, setQuestionCount] = useState(10);
  const [phase, setPhase] = useState<"setup" | "drilling" | "summary">("setup");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [drillQuestions, setDrillQuestions] = useState<DrillQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [responseDraft, setResponseDraft] = useState("");

  const domainsForCurrentSection = useMemo(() => domainsForSection(section), [section]);

  const domainCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const row of meta) {
      if (row.section !== section) continue;
      map.set(row.domain, (map.get(row.domain) ?? 0) + row.value);
    }
    return map;
  }, [meta, section]);

  const availableCount = useMemo(() => {
    return meta
      .filter(
        (row) =>
          row.section === section &&
          (domain === "all" || row.domain === domain) &&
          (difficulty === "all" || row.difficulty === difficulty),
      )
      .reduce((sum, row) => sum + row.value, 0);
  }, [meta, section, domain, difficulty]);

  const handleSectionChange = (next: Section) => {
    setSection(next);
    setDomain("all");
  };

  const runDrill = () => {
    setError(null);
    startTransition(async () => {
      const result = await getDrillQuestions({
        section,
        domain: domain === "all" ? null : domain,
        difficulty: difficulty === "all" ? null : difficulty,
        count: questionCount,
      });
      if (result.length === 0) {
        setError("No questions match those filters yet — try widening them.");
        return;
      }
      setDrillQuestions(result);
      setAnswers({});
      setIndex(0);
      setResponseDraft("");
      setPhase("drilling");
    });
  };

  const current = drillQuestions[index];
  const currentAnswer = current ? answers[current.id] : undefined;

  const handleSelectChoice = (choiceId: string, isCorrect: boolean) => {
    if (!current || currentAnswer?.checked) return;
    setAnswers((prev) => ({
      ...prev,
      [current.id]: { selectedChoiceId: choiceId, checked: true, isCorrect },
    }));
  };

  const handleCheckResponse = () => {
    if (!current || currentAnswer?.checked || !responseDraft.trim()) return;
    const isCorrect =
      !!current.correctResponse &&
      normalizeResponse(responseDraft) === normalizeResponse(current.correctResponse);
    setAnswers((prev) => ({
      ...prev,
      [current.id]: { responseText: responseDraft, checked: true, isCorrect },
    }));
  };

  const handleNext = () => {
    if (index + 1 >= drillQuestions.length) {
      setPhase("summary");
      return;
    }
    setIndex((i) => i + 1);
    setResponseDraft("");
  };

  const handleChangeFilters = () => {
    setPhase("setup");
    setDrillQuestions([]);
    setAnswers({});
    setIndex(0);
  };

  const score = drillQuestions.reduce(
    (sum, q) => sum + (answers[q.id]?.isCorrect ? 1 : 0),
    0,
  );
  const answeredCount = drillQuestions.filter((q) => answers[q.id]?.checked).length;

  if (phase === "setup") {
    return (
      <div className="mt-8">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Subject
              </span>
              <div className="mt-2 flex gap-2">
                {sections.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSectionChange(s)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      section === s
                        ? "bg-ink text-paper"
                        : "border border-line text-ink-soft hover:border-ink hover:text-ink"
                    }`}
                  >
                    {SECTION_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="qb-topic"
                className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                Skill
              </label>
              <select
                id="qb-topic"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="all">All skills</option>
                {domainsForCurrentSection.map((d) => (
                  <option key={d} value={d}>
                    {d} ({domainCounts.get(d) ?? 0})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="qb-difficulty"
                className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                Difficulty
              </label>
              <select
                id="qb-difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "all" | Difficulty)}
                className="mt-2 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                <option value="all">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="qb-count"
                className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                Questions
              </label>
              <select
                id="qb-count"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {COUNT_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} questions
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="font-mono text-xs text-ink-soft">
              {availableCount} matching question{availableCount === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={runDrill}
              disabled={availableCount === 0 || isPending}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {isPending ? "Loading…" : "Start drill"}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
          {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
        </div>
      </div>
    );
  }

  if (phase === "summary") {
    const percent =
      drillQuestions.length > 0 ? Math.round((score / drillQuestions.length) * 100) : 0;
    return (
      <div className="mt-8">
        <div className="rounded-2xl border border-line bg-ink p-6 text-paper">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-paper/60">
            Drill complete
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {score}
            <span className="text-lg font-normal text-paper/60">/{drillQuestions.length}</span>
          </p>
          <p className="mt-2 text-sm text-paper/70">{percent}% correct</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={runDrill}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} />
            {isPending ? "Loading…" : "Drill again"}
          </button>
          <button
            type="button"
            onClick={handleChangeFilters}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Change filters
          </button>
        </div>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Review</h2>
        <div className="mt-4 space-y-4">
          {drillQuestions.map((q, i) => {
            const a = answers[q.id];
            return (
              <div key={q.id} className="rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-soft">
                    Question {i + 1} · {q.topic}
                  </span>
                  {a?.checked ? (
                    a.isCorrect ? (
                      <span className="flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 font-mono text-xs font-semibold text-forest">
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                        Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                        <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
                        Incorrect
                      </span>
                    )
                  ) : (
                    <span className="rounded-full bg-paper-dim px-2 py-0.5 font-mono text-xs font-semibold text-ink-soft">
                      Skipped
                    </span>
                  )}
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink">{q.stem}</p>
                {q.explanation ? (
                  <p className="mt-3 rounded-xl bg-paper-dim p-4 text-sm leading-6 text-ink-soft">
                    {q.explanation}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Question {index + 1} of {drillQuestions.length}
        </p>
        <p className="font-mono text-xs text-ink-soft">
          {answeredCount > 0 ? `${score}/${answeredCount} correct so far` : ""}
        </p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{
            width: `${((index + (currentAnswer?.checked ? 1 : 0)) / drillQuestions.length) * 100}%`,
          }}
        />
      </div>

      <div
        className={
          current.stimulus
            ? "mt-6 grid gap-8 lg:grid-cols-2 lg:items-start"
            : "mx-auto mt-6 max-w-2xl"
        }
      >
        {current.stimulus ? (
          <div className="whitespace-pre-line rounded-2xl border border-line bg-white p-6 text-base leading-7 text-ink lg:sticky lg:top-24">
            {current.stimulus}
          </div>
        ) : null}

        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center gap-2 border-b border-line pb-4">
            <span className="rounded-full bg-paper-dim px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
              {current.topic}
            </span>
            <span className="rounded-full bg-paper-dim px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
              {DIFFICULTY_LABELS[current.difficulty]}
            </span>
          </div>

          <p className="mt-5 whitespace-pre-line text-base leading-7 text-ink">{current.stem}</p>

          {current.type === "multiple_choice" ? (
            <div className="mt-6 space-y-3">
              {current.choices.map((choice) => {
                const selected = currentAnswer?.selectedChoiceId === choice.id;
                const revealed = !!currentAnswer?.checked;
                const showCorrect = revealed && choice.isCorrect;
                const showWrong = revealed && selected && !choice.isCorrect;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => handleSelectChoice(choice.id, choice.isCorrect)}
                    disabled={revealed}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors ${
                      showCorrect
                        ? "border-forest bg-forest/5"
                        : showWrong
                          ? "border-accent bg-accent/5"
                          : selected
                            ? "border-brand bg-brand/5"
                            : "border-line hover:enabled:border-ink"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                        showCorrect
                          ? "border-forest bg-forest text-paper"
                          : showWrong
                            ? "border-accent bg-accent text-paper"
                            : selected
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
                htmlFor="qb-answer"
                className="font-mono text-xs uppercase tracking-wide text-ink-soft"
              >
                Your answer
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                  id="qb-answer"
                  type="text"
                  inputMode="decimal"
                  value={responseDraft}
                  onChange={(e) => setResponseDraft(e.target.value)}
                  disabled={!!currentAnswer?.checked}
                  placeholder="Enter your answer"
                  className="w-40 rounded-lg border border-line px-3.5 py-2.5 font-mono text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-paper-dim"
                />
                {!currentAnswer?.checked ? (
                  <button
                    type="button"
                    onClick={handleCheckResponse}
                    disabled={!responseDraft.trim()}
                    className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-40"
                  >
                    Check
                  </button>
                ) : null}
              </div>
              {currentAnswer?.checked ? (
                <p
                  className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${
                    currentAnswer.isCorrect ? "text-forest" : "text-accent"
                  }`}
                >
                  {currentAnswer.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <XCircle className="h-4 w-4" strokeWidth={2} />
                  )}
                  {currentAnswer.isCorrect
                    ? "Correct"
                    : `Incorrect — correct answer: ${current.correctResponse}`}
                </p>
              ) : null}
            </div>
          )}

          {currentAnswer?.checked && current.explanation ? (
            <p className="mt-5 rounded-xl bg-paper-dim p-4 text-sm leading-6 text-ink-soft">
              {current.explanation}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleChangeFilters}
          className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          End drill
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!currentAnswer?.checked}
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-40"
        >
          {index + 1 === drillQuestions.length ? "Finish" : "Next question"}
          <span aria-hidden="true" className="ml-1.5">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
