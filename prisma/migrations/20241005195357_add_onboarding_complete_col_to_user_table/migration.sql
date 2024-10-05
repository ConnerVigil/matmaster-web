/*
  Warnings:

  - Added the required column `Onboarding_Complete` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Onboarding_Complete" BOOLEAN NOT NULL;
