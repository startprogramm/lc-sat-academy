"use server";

import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import {
  choices,
  moduleQuestions,
  practiceTests,
  questions,
  testModules,
} from "@/db/schema";
import { getDomain } from "@/lib/sat-domains";

type Section = "reading_writing" | "math";
type Difficulty = "easy" | "medium" | "hard";

type DrillFilters = {
  section: Section;
  domain?: string | null;
  difficulty?: Difficulty | null;
  count: number;
};

export async function getDrillQuestions({
  section,
  domain,
  difficulty,
  count,
}: DrillFilters) {
  const session = await auth();
  if (!session?.user) return [];

  const clampedCount = Math.min(Math.max(Math.floor(count), 1), 30);

  // Domain isn't a DB column — it's derived from `topic` — so when a
  // domain filter is requested, resolve it to the concrete topic strings
  // that map to it first.
  let topicsInDomain: string[] | null = null;
  if (domain) {
    const distinctTopics = await db
      .selectDistinct({ topic: questions.topic })
      .from(questions)
      .where(eq(questions.section, section));
    topicsInDomain = distinctTopics
      .map((t) => t.topic)
      .filter((t) => getDomain(section, t) === domain);
  }

  const rows = await db
    .select({
      id: questions.id,
      type: questions.type,
      topic: questions.topic,
      difficulty: questions.difficulty,
      stimulus: questions.stimulus,
      stem: questions.stem,
      correctResponse: questions.correctResponse,
      explanation: questions.explanation,
    })
    .from(questions)
    .where(
      and(
        eq(questions.section, section),
        topicsInDomain ? inArray(questions.topic, topicsInDomain) : undefined,
        difficulty ? eq(questions.difficulty, difficulty) : undefined,
        sql`EXISTS (
          SELECT 1 FROM ${moduleQuestions}
          INNER JOIN ${testModules} ON ${testModules.id} = ${moduleQuestions.moduleId}
          INNER JOIN ${practiceTests} ON ${practiceTests.id} = ${testModules.testId}
          WHERE ${moduleQuestions.questionId} = ${questions.id}
            AND (${practiceTests.isPublished} = true OR ${practiceTests.isBankOnly} = true)
        )`,
      ),
    )
    .orderBy(sql`random()`)
    .limit(clampedCount);

  const questionIds = rows.map((r) => r.id);
  const choiceRows =
    questionIds.length > 0
      ? await db
          .select()
          .from(choices)
          .where(inArray(choices.questionId, questionIds))
          .orderBy(asc(choices.label))
      : [];

  const choicesByQuestion = new Map<string, typeof choiceRows>();
  for (const c of choiceRows) {
    const list = choicesByQuestion.get(c.questionId) ?? [];
    list.push(c);
    choicesByQuestion.set(c.questionId, list);
  }

  return rows.map((q) => ({
    id: q.id,
    type: q.type,
    topic: q.topic,
    difficulty: q.difficulty,
    stimulus: q.stimulus,
    stem: q.stem,
    correctResponse: q.correctResponse,
    explanation: q.explanation,
    choices: (choicesByQuestion.get(q.id) ?? []).map((c) => ({
      id: c.id,
      label: c.label,
      body: c.body,
      isCorrect: c.isCorrect,
    })),
  }));
}
