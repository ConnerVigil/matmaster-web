/*
  Warnings:

  - A unique constraint covering the columns `[Auth0_ID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Auth0_ID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Auth0_ID" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Auth0_ID_key" ON "User"("Auth0_ID");
