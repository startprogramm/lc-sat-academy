"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileActionState } from "@/app/actions/profile";

const GRADE_OPTIONS = [
  { value: "", label: "Select grade" },
  { value: "9", label: "9th grade" },
  { value: "10", label: "10th grade" },
  { value: "11", label: "11th grade" },
  { value: "12", label: "12th grade" },
  { value: "other", label: "Other" },
];

type ProfileFormProps = {
  defaultName: string;
  defaultGradeLevel: string | null;
  defaultTargetTestDate: string | null;
  defaultTargetScore: number | null;
};

const initialState: ProfileActionState = { error: null };

export function ProfileForm({
  defaultName,
  defaultGradeLevel,
  defaultTargetTestDate,
  defaultTargetScore,
}: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultName}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="gradeLevel" className="text-sm font-medium text-ink">
          Grade level
        </label>
        <select
          id="gradeLevel"
          name="gradeLevel"
          defaultValue={defaultGradeLevel ?? ""}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {GRADE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="targetTestDate"
          className="text-sm font-medium text-ink"
        >
          Target test date
        </label>
        <input
          id="targetTestDate"
          name="targetTestDate"
          type="date"
          defaultValue={defaultTargetTestDate ?? ""}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="targetScore" className="text-sm font-medium text-ink">
          Target score
        </label>
        <input
          id="targetScore"
          name="targetScore"
          type="number"
          min={400}
          max={1600}
          step={10}
          placeholder="e.g. 1400"
          defaultValue={defaultTargetScore ?? ""}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-accent" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
