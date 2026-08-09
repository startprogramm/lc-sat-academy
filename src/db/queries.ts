import { and, asc, count, desc, eq, isNotNull, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  attempts,
  choices,
  moduleQuestions,
  practiceTests,
  questions,
  responses,
  testModules,
  users,
} from "@/db/schema";

// A real digital SAT is 27+27 Reading & Writing and 22+22 Math questions.
// Tests with fewer questions than this (e.g. a diagnostic sample) get
// flagged as `isFullLength: false` so the UI can call that out.
const FULL_LENGTH_QUESTION_COUNT = 98;

export async function getUserById(userId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user ?? null;
}

export async function getUserStats(userId: string) {
  const [[testsRow], [questionsRow]] = await Promise.all([
    db
      .select({ value: count() })
      .from(attempts)
      .where(and(eq(attempts.userId, userId), eq(attempts.status, "completed"))),
    db
      .select({ value: count() })
      .from(responses)
      .innerJoin(attempts, eq(responses.attemptId, attempts.id))
      .where(
        and(
          eq(attempts.userId, userId),
          or(isNotNull(responses.selectedChoiceId), isNotNull(responses.responseText)),
        ),
      ),
  ]);

  return {
    testsCompleted: testsRow?.value ?? 0,
    questionsAnswered: questionsRow?.value ?? 0,
  };
}

export async function getRecentAttempts(userId: string, limit = 5) {
  return db
    .select({
      id: attempts.id,
      status: attempts.status,
      startedAt: attempts.startedAt,
      completedAt: attempts.completedAt,
      sectionFilter: attempts.sectionFilter,
      testTitle: practiceTests.title,
      testSlug: practiceTests.slug,
    })
    .from(attempts)
    .innerJoin(practiceTests, eq(attempts.testId, practiceTests.id))
    .where(eq(attempts.userId, userId))
    .orderBy(desc(attempts.startedAt))
    .limit(limit);
}

// --- Practice test catalog ---

export async function getPublishedPracticeTests() {
  const tests = await db
    .select()
    .from(practiceTests)
    .where(eq(practiceTests.isPublished, true))
    .orderBy(desc(practiceTests.isPinned), desc(practiceTests.createdAt));

  const modules = await db
    .select({
      id: testModules.id,
      testId: testModules.testId,
      section: testModules.section,
      moduleNumber: testModules.moduleNumber,
      timeLimitSeconds: testModules.timeLimitSeconds,
    })
    .from(testModules);

  const questionCounts = await db
    .select({ moduleId: moduleQuestions.moduleId, value: count() })
    .from(moduleQuestions)
    .groupBy(moduleQuestions.moduleId);
  const countByModule = new Map(questionCounts.map((c) => [c.moduleId, c.value]));

  return tests.map((test) => {
    const testModulesList = modules.filter((m) => m.testId === test.id);
    const totalSeconds = testModulesList.reduce((sum, m) => sum + m.timeLimitSeconds, 0);
    const totalQuestions = testModulesList.reduce(
      (sum, m) => sum + (countByModule.get(m.id) ?? 0),
      0,
    );
    return {
      ...test,
      moduleCount: testModulesList.length,
      totalMinutes: Math.round(totalSeconds / 60),
      totalQuestions,
      isFullLength: totalQuestions >= FULL_LENGTH_QUESTION_COUNT,
      sections: [...new Set(testModulesList.map((m) => m.section))],
    };
  });
}

export async function getPracticeTestBySlug(slug: string) {
  const [test] = await db
    .select()
    .from(practiceTests)
    .where(eq(practiceTests.slug, slug))
    .limit(1);
  if (!test) return null;

  const modules = await db
    .select({
      id: testModules.id,
      section: testModules.section,
      moduleNumber: testModules.moduleNumber,
      orderIndex: testModules.orderIndex,
      timeLimitSeconds: testModules.timeLimitSeconds,
    })
    .from(testModules)
    .where(eq(testModules.testId, test.id))
    .orderBy(asc(testModules.orderIndex));

  const questionCounts = await db
    .select({ moduleId: moduleQuestions.moduleId, value: count() })
    .from(moduleQuestions)
    .where(
      modules.length > 0
        ? or(...modules.map((m) => eq(moduleQuestions.moduleId, m.id)))
        : undefined,
    )
    .groupBy(moduleQuestions.moduleId);

  const countByModule = new Map(questionCounts.map((c) => [c.moduleId, c.value]));
  const totalQuestions = modules.reduce(
    (sum, m) => sum + (countByModule.get(m.id) ?? 0),
    0,
  );

  return {
    ...test,
    totalQuestions,
    isFullLength: totalQuestions >= FULL_LENGTH_QUESTION_COUNT,
    modules: modules.map((m) => ({
      ...m,
      questionCount: countByModule.get(m.id) ?? 0,
    })),
  };
}

// Returns the most recent attempt for this test regardless of section, so
// visiting the test page resumes whatever's in progress — full test or a
// section-only run.
export async function getLatestAttemptForTest(userId: string, testId: string) {
  const [attempt] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.userId, userId), eq(attempts.testId, testId)))
    .orderBy(desc(attempts.startedAt))
    .limit(1);
  return attempt ?? null;
}

// --- Question bank ---

// One row per (section, topic, difficulty) combo, counting only questions
// that belong to at least one module of a published test — so the bank
// never surfaces content from a draft/unpublished test.
export async function getQuestionBankMeta() {
  return db
    .select({
      section: questions.section,
      topic: questions.topic,
      difficulty: questions.difficulty,
      value: count(),
    })
    .from(questions)
    .where(
      sql`EXISTS (
        SELECT 1 FROM ${moduleQuestions}
        INNER JOIN ${testModules} ON ${testModules.id} = ${moduleQuestions.moduleId}
        INNER JOIN ${practiceTests} ON ${practiceTests.id} = ${testModules.testId}
        WHERE ${moduleQuestions.questionId} = ${questions.id}
          AND ${practiceTests.isPublished} = true
      )`,
    )
    .groupBy(questions.section, questions.topic, questions.difficulty);
}

// --- Test runner ---

export async function getAttemptForRunner(attemptId: string, userId: string) {
  const [attempt] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.id, attemptId), eq(attempts.userId, userId)))
    .limit(1);
  if (!attempt) return null;

  const [test] = await db
    .select()
    .from(practiceTests)
    .where(eq(practiceTests.id, attempt.testId))
    .limit(1);
  if (!test) return null;

  const modules = await db
    .select({
      id: testModules.id,
      section: testModules.section,
      moduleNumber: testModules.moduleNumber,
      orderIndex: testModules.orderIndex,
      timeLimitSeconds: testModules.timeLimitSeconds,
    })
    .from(testModules)
    .where(
      and(
        eq(testModules.testId, test.id),
        attempt.sectionFilter
          ? eq(testModules.section, attempt.sectionFilter)
          : undefined,
      ),
    )
    .orderBy(asc(testModules.orderIndex));

  const moduleIds = modules.map((m) => m.id);

  const questionRows =
    moduleIds.length > 0
      ? await db
          .select({
            moduleId: moduleQuestions.moduleId,
            orderIndex: moduleQuestions.orderIndex,
            id: questions.id,
            type: questions.type,
            topic: questions.topic,
            stimulus: questions.stimulus,
            stem: questions.stem,
          })
          .from(moduleQuestions)
          .innerJoin(questions, eq(moduleQuestions.questionId, questions.id))
          .where(or(...moduleIds.map((id) => eq(moduleQuestions.moduleId, id))))
          .orderBy(asc(moduleQuestions.orderIndex))
      : [];

  const questionIds = questionRows.map((q) => q.id);

  const choiceRows =
    questionIds.length > 0
      ? await db
          .select({
            questionId: choices.questionId,
            id: choices.id,
            label: choices.label,
            body: choices.body,
          })
          .from(choices)
          .where(or(...questionIds.map((id) => eq(choices.questionId, id))))
      : [];

  const choicesByQuestion = new Map<string, typeof choiceRows>();
  for (const c of choiceRows) {
    const list = choicesByQuestion.get(c.questionId) ?? [];
    list.push(c);
    choicesByQuestion.set(c.questionId, list);
  }

  const existingResponses = await db
    .select({
      questionId: responses.questionId,
      selectedChoiceId: responses.selectedChoiceId,
      responseText: responses.responseText,
      markedForReview: responses.markedForReview,
    })
    .from(responses)
    .where(eq(responses.attemptId, attemptId));

  const modulesWithQuestions = modules.map((m) => ({
    ...m,
    questions: questionRows
      .filter((q) => q.moduleId === m.id)
      .map((q) => ({
        id: q.id,
        type: q.type,
        topic: q.topic,
        stimulus: q.stimulus,
        stem: q.stem,
        choices: (choicesByQuestion.get(q.id) ?? []).map((c) => ({
          id: c.id,
          label: c.label,
          body: c.body,
        })),
      })),
  }));

  return {
    attemptId: attempt.id,
    status: attempt.status,
    currentModuleId: attempt.currentModuleId,
    sectionFilter: attempt.sectionFilter,
    testTitle: test.title,
    testSlug: test.slug,
    modules: modulesWithQuestions,
    existingResponses,
  };
}

// --- Results ---

export async function getAttemptResults(attemptId: string, userId: string) {
  const [attempt] = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.id, attemptId), eq(attempts.userId, userId)))
    .limit(1);
  if (!attempt) return null;

  const [test] = await db
    .select()
    .from(practiceTests)
    .where(eq(practiceTests.id, attempt.testId))
    .limit(1);
  if (!test) return null;

  const modules = await db
    .select()
    .from(testModules)
    .where(
      and(
        eq(testModules.testId, test.id),
        attempt.sectionFilter
          ? eq(testModules.section, attempt.sectionFilter)
          : undefined,
      ),
    )
    .orderBy(asc(testModules.orderIndex));

  const moduleIds = modules.map((m) => m.id);

  const questionRows =
    moduleIds.length > 0
      ? await db
          .select({
            moduleId: moduleQuestions.moduleId,
            orderIndex: moduleQuestions.orderIndex,
            id: questions.id,
            section: questions.section,
            type: questions.type,
            topic: questions.topic,
            stimulus: questions.stimulus,
            stem: questions.stem,
            correctResponse: questions.correctResponse,
            explanation: questions.explanation,
          })
          .from(moduleQuestions)
          .innerJoin(questions, eq(moduleQuestions.questionId, questions.id))
          .where(or(...moduleIds.map((id) => eq(moduleQuestions.moduleId, id))))
          .orderBy(asc(moduleQuestions.orderIndex))
      : [];

  const questionIds = questionRows.map((q) => q.id);

  const choiceRows =
    questionIds.length > 0
      ? await db
          .select()
          .from(choices)
          .where(or(...questionIds.map((id) => eq(choices.questionId, id))))
      : [];

  const choicesByQuestion = new Map<string, typeof choiceRows>();
  for (const c of choiceRows) {
    const list = choicesByQuestion.get(c.questionId) ?? [];
    list.push(c);
    choicesByQuestion.set(c.questionId, list);
  }

  const responseRows = await db
    .select()
    .from(responses)
    .where(eq(responses.attemptId, attemptId));
  const responseByQuestion = new Map(responseRows.map((r) => [r.questionId, r]));

  const questionResults = questionRows.map((q) => {
    const qChoices = choicesByQuestion.get(q.id) ?? [];
    const response = responseByQuestion.get(q.id);
    const correctChoice = qChoices.find((c) => c.isCorrect);
    return {
      ...q,
      choices: qChoices,
      response: response ?? null,
      correctChoiceId: correctChoice?.id ?? null,
      isCorrect: response?.isCorrect ?? false,
      wasAnswered: !!(response?.selectedChoiceId || response?.responseText),
    };
  });

  const bySection = (sec: "reading_writing" | "math") =>
    questionResults.filter((q) => q.section === sec);

  const summarize = (list: typeof questionResults) => ({
    total: list.length,
    correct: list.filter((q) => q.isCorrect).length,
  });

  return {
    testTitle: test.title,
    testSlug: test.slug,
    completedAt: attempt.completedAt,
    sectionFilter: attempt.sectionFilter,
    overall: summarize(questionResults),
    readingWriting: summarize(bySection("reading_writing")),
    math: summarize(bySection("math")),
    modules: modules.map((m) => ({
      ...m,
      questions: questionResults
        .filter((q) => q.moduleId === m.id)
        .sort((a, b) => a.orderIndex - b.orderIndex),
    })),
  };
}
