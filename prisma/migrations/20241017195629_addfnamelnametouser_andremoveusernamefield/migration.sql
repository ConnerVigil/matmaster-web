/*
  Warnings:

  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_Username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Username",
ADD COLUMN     "First_Name" VARCHAR(50),
ADD COLUMN     "Last_Name" VARCHAR(50);
