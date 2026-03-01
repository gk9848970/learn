CREATE TYPE "public"."userRole" AS ENUM('ADMIN', 'BASIC');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userRole" "userRole" DEFAULT 'ADMIN' NOT NULL;