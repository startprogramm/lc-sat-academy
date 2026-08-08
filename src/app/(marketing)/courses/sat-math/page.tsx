import type { Metadata } from "next";
import { CalendarDays, MapPin, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "SAT Mathematics Courses (In Person) — LC SAT Academy",
  description:
    "Offline SAT Math classes in three levels — Foundation, Pre-SAT, and Advanced — every day for 500,000 UZS/month, plus a dedicated SAT Math 800 track.",
};

const REGISTER_EMAIL = "support@satacademygulistan.uz";

type Level = {
  time: string;
  name: string;
  color: string;
  body: string;
};

const LEVELS: Level[] = [
  {
    time: "2:00 – 4:00 PM",
    name: "SAT Foundation",
    color: "var(--forest)",
    body: "Where every student starts — number sense, core algebra, and the habits that make everything after this click.",
  },
  {
    time: "4:00 – 6:00 PM",
    name: "Pre-SAT",
    color: "var(--brand)",
    body: "Real SAT-style problems and timed sets — the bridge between the fundamentals and the actual exam.",
  },
  {
    time: "6:00 – 8:00 PM",
    name: "SAT Advanced",
    color: "var(--accent)",
    body: "High-difficulty drilling and full timed sections for students pushing hard toward their target score.",
  },
];

function mailtoFor(subject: string) {
  return `mailto:${REGISTER_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default function SatMathCoursePage() {
  return (
    <div>
      {/* Hero — faint graph-paper grid, grounded in the subject */}
      <section
        className="relative overflow-hidden border-b border-line"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "center",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, var(--paper) 35%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 sm:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
            <MapPin className="h-3.5 w-3.5 text-pencil" strokeWidth={2.5} />
            Offline · in person
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-ink sm:text-6xl">
            SAT Mathematics,
            <br />
            taught in the room.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-ink-soft">
            Three levels, every single day, at our learning center. Same
            desk, same whiteboard, same instructor watching you work through
            it — no app required.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Course schedule
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Three sessions, every day
          </h2>
          <p className="mt-3 flex items-start gap-2 text-ink-soft">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-pencil" strokeWidth={2} />
            The same lineup runs on odd-numbered and even-numbered calendar
            days alike — pick whichever days fit your week and start
            whenever.
          </p>

          <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {LEVELS.map((level) => (
              <div
                key={level.name}
                className="flex flex-col gap-3 border-l-4 p-6 sm:flex-row sm:items-center sm:gap-8"
                style={{ borderLeftColor: level.color }}
              >
                <div className="font-mono text-sm font-semibold tabular-nums text-ink sm:w-40 sm:shrink-0">
                  {level.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {level.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    {level.body}
                  </p>
                </div>
                <a
                  href={mailtoFor(`${level.name} — Registration`)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink sm:self-center"
                >
                  Register
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b border-line bg-paper-dim">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:px-8 sm:py-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Course fee
          </span>
          <p className="mt-3 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
            500,000 UZS
            <span className="ml-2 whitespace-nowrap text-lg font-normal text-ink-soft">
              / month
            </span>
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            One flat price, whichever of the three levels fits you.
          </p>
        </div>
      </section>

      {/* SAT Math 800 flagship */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:gap-14 sm:text-left">
            <div className="shrink-0">
              <p
                className="font-display text-[7rem] font-extrabold leading-none tracking-tight sm:text-[9rem]"
                style={{ color: "var(--pencil)" }}
              >
                800
              </p>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-pencil">
                <Trophy className="h-3.5 w-3.5" strokeWidth={2.5} />
                Flagship program
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl">
                The SAT Math 800 track
              </h2>
              <p className="mt-3 max-w-md text-paper/70">
                One experienced instructor, one goal: a perfect score.
                Built for students already scoring high who want to close
                the last gap — the questions that separate a 750 from an
                800.
              </p>
              <a
                href={mailtoFor("SAT Math 800 — Registration")}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors hover:brightness-95"
                style={{ backgroundColor: "var(--pencil)" }}
              >
                Ask about SAT Math 800
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
            Course registration
          </h2>
          <p className="mt-3 text-ink-soft">
            Choose the program that matches your current level and start
            your SAT preparation journey with us.
          </p>
          <a
            href={mailtoFor("SAT Mathematics Course — Registration")}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
          >
            Register now
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
