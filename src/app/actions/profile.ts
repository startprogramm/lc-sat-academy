"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import { users, gradeLevel } from "@/db/schema";

export type ProfileActionState = { error: string | null };

type GradeLevel = (typeof gradeLevel.enumValues)[number];

export async function updateProfile(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  const gradeLevelInput = String(formData.get("gradeLevel") ?? "");
  const targetTestDate = String(formData.get("targetTestDate") ?? "").trim();
  const targetScoreRaw = String(formData.get("targetScore") ?? "").trim();

  if (!name) {
    return { error: "Name can't be empty." };
  }

  const gradeLevelValue = (
    gradeLevel.enumValues as readonly string[]
  ).includes(gradeLevelInput)
    ? (gradeLevelInput as GradeLevel)
    : null;

  let targetScore: number | null = null;
  if (targetScoreRaw) {
    const parsed = Number(targetScoreRaw);
    if (!Number.isInteger(parsed) || parsed < 400 || parsed > 1600) {
      return { error: "Target score must be between 400 and 1600." };
    }
    targetScore = parsed;
  }

  await db
    .update(users)
    .set({
      name,
      gradeLevel: gradeLevelValue,
      targetTestDate: targetTestDate || null,
      targetScore,
    })
    .where(eq(users.id, session.user.id));

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect("/dashboard");
}
