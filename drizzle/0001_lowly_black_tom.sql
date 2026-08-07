CREATE TYPE "public"."grade_level" AS ENUM('9', '10', '11', '12', 'other');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "grade_level" "grade_level";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "target_test_date" date;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "target_score" integer;