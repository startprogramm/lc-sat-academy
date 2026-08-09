import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const userRole = pgEnum("user_role", ["student", "teacher", "admin"]);
export const gradeLevel = pgEnum("grade_level", [
  "9",
  "10",
  "11",
  "12",
  "other",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  role: userRole("role").notNull().default("student"),
  gradeLevel: gradeLevel("grade_level"),
  targetTestDate: date("target_test_date", { mode: "string" }),
  targetScore: integer("target_score"),
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
export const questionType = pgEnum("question_type", [
  "multiple_choice",
  "student_response",
]);
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
  // Pinned tests are shown first on the practice tests list, ahead of
  // everything else regardless of creation date.
  isPinned: boolean("is_pinned").notNull().default(false),
  // Bank-only tests hold standalone question-bank content: never shown in
  // the practice tests catalog or startable as a timed test (isPublished
  // stays false), but still counted toward the question bank's pool.
  isBankOnly: boolean("is_bank_only").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// A module is one timed block a student sees on screen: Reading & Writing
// Module 1, Module 2, Math Module 1, Module 2 — matching the digital SAT's
// Bluebook structure. orderIndex is the position across all 4 modules.
export const testModules = pgTable("test_modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  testId: uuid("test_id")
    .notNull()
    .references(() => practiceTests.id, { onDelete: "cascade" }),
  section: section("section").notNull(),
  moduleNumber: integer("module_number").notNull(),
  orderIndex: integer("order_index").notNull(),
  timeLimitSeconds: integer("time_limit_seconds").notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  section: section("section").notNull(),
  type: questionType("type").notNull().default("multiple_choice"),
  topic: text("topic").notNull(),
  difficulty: difficulty("difficulty").notNull().default("medium"),
  stimulus: text("stimulus"),
  stem: text("stem").notNull(),
  // Accepted answer for student_response (free-entry) questions.
  correctResponse: text("correct_response"),
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

export const moduleQuestions = pgTable(
  "module_questions",
  {
    moduleId: uuid("module_id")
      .notNull()
      .references(() => testModules.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
  },
  (moduleQuestion) => [
    primaryKey({
      columns: [moduleQuestion.moduleId, moduleQuestion.questionId],
    }),
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
  currentModuleId: uuid("current_module_id").references(() => testModules.id),
  // Null = the full test (both sections). Set = this attempt only covers
  // that one section's modules, for students who want to drill just Math
  // or just Reading & Writing instead of a full-length run.
  sectionFilter: section("section_filter"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const responses = pgTable(
  "responses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    selectedChoiceId: uuid("selected_choice_id").references(() => choices.id),
    responseText: text("response_text"),
    markedForReview: boolean("marked_for_review").notNull().default(false),
    isCorrect: boolean("is_correct"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (response) => [unique().on(response.attemptId, response.questionId)],
);
