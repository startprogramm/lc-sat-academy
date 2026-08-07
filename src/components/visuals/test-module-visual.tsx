"use client";

import { Clock, Flag } from "lucide-react";
import { BubbleMark } from "@/components/logo";
import { useInView } from "@/lib/use-in-view";

type DotState = "answered" | "empty" | "flagged";

// A realistic-looking Module 1 navigator: 27 questions, one flagged,
// a couple left blank near the end — not a perfect run, like a real attempt.
const DOTS: DotState[] = [
  "answered", "answered", "answered", "answered", "answered", "answered",
  "answered", "answered", "answered", "flagged", "answered", "answered",
  "answered", "answered", "answered", "answered", "empty", "answered",
  "answered", "answered", "answered", "flagged", "answered", "answered",
  "empty", "answered", "answered",
];

export function TestModuleVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-30px_rgba(20,23,28,0.35)] sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider">
          <span className="rounded-full bg-ink px-3 py-1.5 text-paper">
            Module 1
          </span>
          <span className="rounded-full px-3 py-1.5 text-ink-soft">
            Module 2
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          32:00
        </div>
      </div>

      <p className="mb-3 mt-5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
        Question navigator
      </p>
      <div className="flex flex-wrap gap-2">
        {DOTS.map((state, i) => (
          <span
            key={i}
            className={`relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ease-out ${
              inView
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-1 scale-75 opacity-0"
            } ${
              state === "answered"
                ? "border-ink bg-ink"
                : state === "flagged"
                  ? "border-pencil bg-paper"
                  : "border-line bg-paper"
            }`}
            style={{
              transitionDuration: "420ms",
              transitionDelay: inView ? `${i * 22}ms` : "0ms",
            }}
          >
            {state === "answered" ? (
              <BubbleMark className="h-[10px] w-[10px]" fill="var(--paper)" ring="transparent" />
            ) : null}
            {state === "flagged" ? (
              <Flag
                className="h-[9px] w-[9px] text-pencil"
                strokeWidth={3}
                fill="var(--pencil)"
              />
            ) : null}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
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
  );
}
