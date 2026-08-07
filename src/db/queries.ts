import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { attempts, practiceTests, responses, users } from "@/db/schema";

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
      .where(eq(attempts.userId, userId)),
    db
      .select({ value: count() })
      .from(responses)
      .innerJoin(attempts, eq(responses.attemptId, attempts.id))
      .where(eq(attempts.userId, userId)),
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
      testTitle: practiceTests.title,
    })
    .from(attempts)
    .innerJoin(practiceTests, eq(attempts.testId, practiceTests.id))
    .where(eq(attempts.userId, userId))
    .orderBy(desc(attempts.startedAt))
    .limit(limit);
}
