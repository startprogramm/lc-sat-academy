"use server";

import { and, asc, eq, gt, isNull, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import {
  attempts,
  choices,
  moduleQuestions,
  questions,
  responses,
  testModules,
} from "@/db/schema";

type SectionFilter = "reading_writing" | "math" | null;

function normalizeResponse(value: string): string {
  const trimmed = value.trim().replace(/^\$/, "").replace(/,/g, "");
  const fractionMatch = trimmed.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const denominator = Number(fractionMatch[2]);
    if (denominator !== 0) {
      return String(Number(fractionMatch[1]) / denominator);
    }
  }
  const asNumber = Number(trimmed);
  if (!Number.isNaN(asNumber) && trimmed !== "") {
    return String(asNumber);
  }
  return trimmed.toLowerCase();
}

export async function startAttempt(testId: string, sectionFilter: SectionFilter = null) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [existing] = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, session.user.id),
        eq(attempts.testId, testId),
        eq(attempts.status, "in_progress"),
        sectionFilter
          ? eq(attempts.sectionFilter, sectionFilter)
          : isNull(attempts.sectionFilter),
      ),
    )
    .limit(1);

  if (existing) {
    redirect(`/test-session/${existing.id}`);
  }

  const [firstModule] = await db
    .select({ id: testModules.id })
    .from(testModules)
    .where(
      and(
        eq(testModules.testId, testId),
        sectionFilter ? eq(testModules.section, sectionFilter) : undefined,
      ),
    )
    .orderBy(asc(testModules.orderIndex))
    .limit(1);

  if (!firstModule) {
    throw new Error("This test has no modules yet.");
  }

  const [attempt] = await db
    .insert(attempts)
    .values({
      userId: session.user.id,
      testId,
      status: "in_progress",
      currentModuleId: firstModule.id,
      sectionFilter,
    })
    .returning();

  revalidatePath("/practice-tests");
  redirect(`/test-session/${attempt.id}`);
}

export async function saveResponse(
  attemptId: string,
  questionId: string,
  data: {
    selectedChoiceId?: string | null;
    responseText?: string | null;
    markedForReview?: boolean;
  },
) {
  const session = await auth();
  if (!session?.user) return { ok: false as const };

  const [attempt] = await db
    .select({ id: attempts.id, status: attempts.status })
    .from(attempts)
    .where(and(eq(attempts.id, attemptId), eq(attempts.userId, session.user.id)))
    .limit(1);

  if (!attempt || attempt.status !== "in_progress") {
    return { ok: false as const };
  }

  await db
    .insert(responses)
    .values({
      attemptId,
      questionId,
      selectedChoiceId: data.selectedChoiceId ?? null,
      responseText: data.responseText ?? null,
      markedForReview: data.markedForReview ?? false,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [responses.attemptId, responses.questionId],
      set: {
        selectedChoiceId: data.selectedChoiceId ?? null,
        responseText: data.responseText ?? null,
        markedForReview: data.markedForReview ?? false,
        updatedAt: new Date(),
      },
    });

  return { ok: true as const };
}

async function gradeAttempt(attemptId: string) {
  const questionRows = await db
    .select({
      id: questions.id,
      type: questions.type,
      correctResponse: questions.correctResponse,
    })
    .from(moduleQuestions)
    .innerJoin(
      testModules,
      eq(moduleQuestions.moduleId, testModules.id),
    )
    .innerJoin(
      attempts,
      eq(attempts.testId, testModules.testId),
    )
    .innerJoin(questions, eq(moduleQuestions.questionId, questions.id))
    .where(eq(attempts.id, attemptId));

  const questionIds = questionRows.map((q) => q.id);
  const choiceRows =
    questionIds.length > 0
      ? await db
          .select()
          .from(choices)
          .where(or(...questionIds.map((id) => eq(choices.questionId, id))))
      : [];
  const correctChoiceByQuestion = new Map(
    choiceRows.filter((c) => c.isCorrect).map((c) => [c.questionId, c.id]),
  );

  const responseRows = await db
    .select()
    .from(responses)
    .where(eq(responses.attemptId, attemptId));

  for (const response of responseRows) {
    const question = questionRows.find((q) => q.id === response.questionId);
    if (!question) continue;

    let isCorrect = false;
    if (question.type === "multiple_choice") {
      isCorrect =
        !!response.selectedChoiceId &&
        response.selectedChoiceId === correctChoiceByQuestion.get(question.id);
    } else if (question.type === "student_response" && response.responseText) {
      isCorrect =
        !!question.correctResponse &&
        normalizeResponse(response.responseText) ===
          normalizeResponse(question.correctResponse);
    }

    await db
      .update(responses)
      .set({ isCorrect })
      .where(eq(responses.id, response.id));
  }
}

export async function advanceModule(attemptId: string) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [attempt] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.id, attemptId), eq(attempts.userId, session.user.id)))
    .limit(1);

  if (!attempt || attempt.status !== "in_progress" || !attempt.currentModuleId) {
    return { done: true as const };
  }

  const [currentModule] = await db
    .select()
    .from(testModules)
    .where(eq(testModules.id, attempt.currentModuleId))
    .limit(1);
  if (!currentModule) return { done: true as const };

  const [nextModule] = await db
    .select()
    .from(testModules)
    .where(
      and(
        eq(testModules.testId, currentModule.testId),
        gt(testModules.orderIndex, currentModule.orderIndex),
        attempt.sectionFilter
          ? eq(testModules.section, attempt.sectionFilter)
          : undefined,
      ),
    )
    .orderBy(asc(testModules.orderIndex))
    .limit(1);

  if (nextModule) {
    await db
      .update(attempts)
      .set({ currentModuleId: nextModule.id })
      .where(eq(attempts.id, attemptId));
    return {
      done: false as const,
      nextModuleId: nextModule.id,
      nextSection: nextModule.section,
      previousSection: currentModule.section,
    };
  }

  await gradeAttempt(attemptId);
  await db
    .update(attempts)
    .set({ status: "completed", completedAt: new Date(), currentModuleId: null })
    .where(eq(attempts.id, attemptId));

  revalidatePath("/dashboard");
  revalidatePath("/progress");
  revalidatePath("/practice-tests");

  return { done: true as const };
}
