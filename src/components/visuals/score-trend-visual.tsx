"use client";

import { BubbleMark } from "@/components/logo";
import { useInView } from "@/lib/use-in-view";

const MILESTONES = [
  { x: 6, y: 82, score: 1180 },
  { x: 36, y: 60, score: 1290 },
  { x: 66, y: 38, score: 1410 },
  { x: 94, y: 12, score: 1540 },
];

const PATH = "M6,82 C20,78 26,64 36,60 C50,54 56,44 66,38 C78,31 84,20 94,12";

export function ScoreTrendVisual() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-30px_rgba(20,23,28,0.35)] sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          Score trend
        </span>
        <span className="font-mono text-[11px] text-ink-soft">
          4 practice tests
        </span>
      </div>

      <div
        className="relative mt-6 h-44 w-full overflow-hidden rounded-xl"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "16.66% 20%",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d={PATH}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: "stroke-dashoffset 1.3s cubic-bezier(0.65,0,0.35,1)",
            }}
          />
        </svg>

        {MILESTONES.map((m, i) => (
          <div
            key={m.score}
            className="absolute"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`transition-all duration-500 ease-out ${
                inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: inView ? `${400 + i * 220}ms` : "0ms",
              }}
            >
              <BubbleMark
                className="h-4 w-4"
                fill={
                  i === MILESTONES.length - 1 ? "var(--accent)" : "var(--brand)"
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
        <div>
          <p className="font-mono text-3xl font-semibold tracking-tight text-ink">
            1540
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">Latest score</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 font-mono text-xs font-semibold text-forest">
          ↑ +360
        </span>
      </div>
    </div>
  );
}
