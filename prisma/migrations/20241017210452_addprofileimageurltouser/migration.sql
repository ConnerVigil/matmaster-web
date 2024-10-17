/*
  Warnings:

  - You are about to drop the column `Profile_Image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Profile_Image",
ADD COLUMN     "Profile_Image_URL" TEXT;
