import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { registerWithPassword, signInWithGoogle } from "@/app/actions/auth";
import { GoogleIcon } from "@/components/google-icon";
import { CredentialsForm } from "@/components/credentials-form";

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
        Start free
      </h1>
      <p className="mt-2 text-ink-soft">
        3 free practice tests. No credit card.
      </p>

      <form action={signInWithGoogle} className="mt-8">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <GoogleIcon className="h-4 w-4" />
          Continue with Google
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs uppercase tracking-wider text-ink-soft">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <CredentialsForm
        action={registerWithPassword}
        submitLabel="Create account"
        includeName
      />

      <p className="mt-8 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink underline underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
