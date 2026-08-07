"use client";

import { Flag, X } from "lucide-react";

type NavQuestion = {
  id: string;
  answered: boolean;
  markedForReview: boolean;
};

type QuestionNavigatorProps = {
  open: boolean;
  onClose: () => void;
  questions: NavQuestion[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function QuestionNavigator({
  open,
  onClose,
  questions,
  currentIndex,
  onSelect,
}: QuestionNavigatorProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-2xl border border-line bg-white p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            Questions
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-2.5 sm:grid-cols-8">
          {questions.map((q, index) => {
            const isCurrent = index === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelect(index);
                  onClose();
                }}
                aria-label={`Go to question ${index + 1}${q.answered ? ", answered" : ", unanswered"}${q.markedForReview ? ", marked for review" : ""}`}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "border-brand text-brand ring-2 ring-brand/25"
                    : q.markedForReview
                      ? "border-pencil text-ink"
                      : q.answered
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft"
                }`}
              >
                {index + 1}
                {q.markedForReview ? (
                  <Flag
                    className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-paper text-pencil"
                    strokeWidth={2}
                    fill="var(--pencil)"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-ink bg-ink" />
            Answered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-line" />
            Unanswered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-pencil" />
            Marked for review
          </span>
        </div>
      </div>
    </div>
  );
}
