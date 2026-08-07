import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/db/queries";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await getUserById(session.user.id);
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-12">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Settings
      </span>
      <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        Edit profile
      </h1>
      <p className="mt-2 text-ink-soft">
        Set your grade and target score so we can tell you how far you have
        to go.
      </p>

      <div className="mt-8 max-w-md">
        <ProfileForm
          defaultName={user.name ?? ""}
          defaultGradeLevel={user.gradeLevel}
          defaultTargetTestDate={user.targetTestDate}
          defaultTargetScore={user.targetScore}
        />
      </div>
    </div>
  );
}
