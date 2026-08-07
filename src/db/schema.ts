import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const userRole = pgEnum("user_role", ["student", "teacher", "admin"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  role: userRole("role").notNull().default("student"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Auth.js adapter tables (DrizzleAdapter expects this exact shape) ---

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
);

// --- Practice content ---

export const section = pgEnum("section", ["reading_writing", "math"]);
export const difficulty = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const attemptStatus = pgEnum("attempt_status", [
  "in_progress",
  "completed",
  "abandoned",
]);

export const practiceTests = pgTable("practice_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  section: section("section").notNull(),
  topic: text("topic").notNull(),
  difficulty: difficulty("difficulty").notNull().default("medium"),
  stem: text("stem").notNull(),
  explanation: text("explanation"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const choices = pgTable("choices", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  body: text("body").notNull(),
  isCorrect: boolean("is_correct").notNull().default(false),
});

export const testQuestions = pgTable(
  "test_questions",
  {
    testId: uuid("test_id")
      .notNull()
      .references(() => practiceTests.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
  },
  (testQuestion) => [
    primaryKey({ columns: [testQuestion.testId, testQuestion.questionId] }),
  ],
);

export const attempts = pgTable("attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  testId: uuid("test_id")
    .notNull()
    .references(() => practiceTests.id, { onDelete: "cascade" }),
  status: attemptStatus("status").notNull().default("in_progress"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const responses = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  attemptId: uuid("attempt_id")
    .notNull()
    .references(() => attempts.id, { onDelete: "cascade" }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  selectedChoiceId: uuid("selected_choice_id").references(() => choices.id),
  isCorrect: boolean("is_correct"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
