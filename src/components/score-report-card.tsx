"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { label: "Reading & Writing", score: 760, of: 800, color: "var(--brand)" },
  { label: "Math", score: 780, of: 800, color: "var(--accent)" },
];

const TOTAL_SCORE = 1540;
const TOTAL_OF = 1600;
const DELTA = 180;
const DURATION_MS = 1200;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ScoreReportCard() {
  const [progress, setProgress] = useState(0);
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (prefersReduced) {
        setProgress(1);
        setShowDelta(true);
        return;
      }
      if (start === null) start = t;
      const raw = Math.min((t - start) / DURATION_MS, 1);
      setProgress(easeOutCubic(raw));
      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setShowDelta(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -top-4 right-6 z-10 rotate-[-5deg] rounded-md bg-ink px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-paper shadow-md">
        Adapts every module
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,23,28,0.35)] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            Score report
          </span>
          <span className="font-mono text-[11px] text-ink-soft">
            Practice test 7
          </span>
        </div>

        <div className="mt-5 flex items-end gap-3">
          <span className="font-mono text-6xl font-semibold leading-none tracking-tight tabular-nums text-ink">
            {Math.round(TOTAL_SCORE * progress)}
          </span>
          <span className="pb-1 font-mono text-lg text-ink-soft">
            /{TOTAL_OF}
          </span>
        </div>

        <div
          className={`mt-2 flex items-center gap-1.5 transition-opacity duration-500 ${
            showDelta ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 font-mono text-xs font-semibold text-forest">
            ↑ +{DELTA}
          </span>
          <span className="text-xs text-ink-soft">since your diagnostic</span>
        </div>

        <div className="mt-6 space-y-4 border-t border-line pt-6">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink">
                  {section.label}
                </span>
                <span className="font-mono text-sm tabular-nums text-ink-soft">
                  {Math.round(section.score * progress)}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(section.score / section.of) * 100 * progress}%`,
                    backgroundColor: section.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-5 text-ink-soft">
          Estimated from your last 3 full-length practice tests.
        </p>
      </div>
    </div>
  );
}
