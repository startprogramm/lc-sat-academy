import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Target,
  CalendarClock,
  ClipboardCheck,
  BookOpenCheck,
  ClipboardList,
  BookOpen,
  LineChart,
} from "lucide-react";
import { auth } from "@/auth";
import { getUserById, getUserStats, getRecentAttempts } from "@/db/queries";

const GRADE_LABELS: Record<string, string> = {
  "9": "9th grade",
  "10": "10th grade",
  "11": "11th grade",
  "12": "12th grade",
  other: "Other",
};

function daysUntil(dateString: string): number {
  const today = new Date();
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const [year, month, day] = dateString.split("-").map(Number);
  const targetUtc = Date.UTC(year, month - 1, day);
  return Math.round((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

const QUICK_ACTIONS = [
  {
    href: "/practice-tests",
    label: "Start a practice test",
    body: "Full-length, timed, and scored like the real thing.",
    icon: ClipboardList,
  },
  {
    href: "/question-bank",
    label: "Browse the question bank",
    body: "Drill by subject, skill, and difficulty.",
    icon: BookOpen,
  },
  {
    href: "/progress",
    label: "Check your progress",
    body: "Score history and weak areas, once you have data.",
    icon: LineChart,
  },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await getUserById(session.user.id);
  if (!user) redirect("/login");

  const [stats, recentAttempts] = await Promise.all([
    getUserStats(user.id),
    getRecentAttempts(user.id),
  ]);

  const days = user.targetTestDate ? daysUntil(user.targetTestDate) : null;
  const profileIncomplete =
    !user.gradeLevel && !user.targetScore && !user.targetTestDate;

  const statCards = [
    {
      label: "Target score",
      value: user.targetScore ? `${user.targetScore}` : "—",
      suffix: user.targetScore ? "/1600" : undefined,
      icon: Target,
    },
    {
      label: "Test date",
      value: days === null ? "—" : days >= 0 ? `${days}` : "Passed",
      suffix: days !== null && days >= 0 ? "days left" : undefined,
      icon: CalendarClock,
    },
    {
      label: "Tests completed",
      value: `${stats.testsCompleted}`,
      icon: ClipboardCheck,
    },
    {
      label: "Questions answered",
      value: `${stats.questionsAnswered}`,
      icon: BookOpenCheck,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Overview
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        Welcome back, {user.name?.split(" ")[0] ?? "there"}
      </h1>
      <p className="mt-2 text-ink-soft">
        {user.email}
        {user.gradeLevel ? ` · ${GRADE_LABELS[user.gradeLevel]}` : ""}
      </p>

      {profileIncomplete ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5">
          <p className="text-sm text-ink-soft">
            Your profile is empty — add your grade and target score to
            personalize your dashboard.
          </p>
          <Link
            href="/profile"
            className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
          >
            Complete profile
          </Link>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <stat.icon
              className="h-5 w-5 text-brand"
              strokeWidth={2}
              aria-hidden="true"
            />
            <div className="mt-3 font-mono text-2xl font-semibold text-ink sm:text-3xl">
              {stat.value}
              {stat.suffix ? (
                <span className="text-sm font-normal text-ink-soft">
                  {" "}
                  {stat.suffix}
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-xs text-ink-soft">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Score trend
          </h2>
          {stats.testsCompleted === 0 ? (
            <div className="mt-4 flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-line text-center">
              <p className="text-sm text-ink-soft">
                Your score history will appear here after your first
                practice test.
              </p>
              <Link
                href="/practice-tests"
                className="mt-3 text-sm font-semibold text-brand hover:underline"
              >
                Browse practice tests →
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">
              {stats.testsCompleted} test
              {stats.testsCompleted === 1 ? "" : "s"} completed.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Recent activity
          </h2>
          {recentAttempts.length === 0 ? (
            <div className="mt-4 flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-line text-center">
              <p className="text-sm text-ink-soft">No activity yet.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentAttempts.map((attempt) => (
                <li key={attempt.id} className="text-sm">
                  <p className="font-medium text-ink">{attempt.testTitle}</p>
                  <p className="text-ink-soft capitalize">
                    {attempt.status.replace("_", " ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-ink">
        Quick actions
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink"
          >
            <action.icon
              className="h-5 w-5 text-brand"
              strokeWidth={2}
              aria-hidden="true"
            />
            <div className="mt-3 font-semibold text-ink group-hover:text-brand">
              {action.label}
            </div>
            <p className="mt-1 text-sm text-ink-soft">{action.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
