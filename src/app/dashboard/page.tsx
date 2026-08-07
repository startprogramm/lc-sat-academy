import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signOutAndRedirect } from "@/app/actions/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Signed in
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
        Welcome, {session.user.name ?? session.user.email}
      </h1>
      <p className="mt-2 text-ink-soft">
        {session.user.email} · {session.user.role}
      </p>

      <p className="mt-8 max-w-md text-ink-soft">
        This is a placeholder dashboard confirming accounts work end-to-end.
        Practice tests, the question bank, and real progress tracking land
        here next.
      </p>

      <form action={signOutAndRedirect} className="mt-8">
        <button
          type="submit"
          className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
