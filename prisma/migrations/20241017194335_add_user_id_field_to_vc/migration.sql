/*
  Warnings:

  - Added the required column `User_ID` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "User_ID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
