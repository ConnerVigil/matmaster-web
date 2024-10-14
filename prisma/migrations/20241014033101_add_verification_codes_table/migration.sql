/*
  Warnings:

  - You are about to drop the column `Matt_ID` on the `Bouts` table. All the data in the column will be lost.
  - You are about to drop the column `Number_Matts` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Matts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BoutsToMatts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Mat_ID` to the `Bouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Number_Mats` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoutsToMatts" DROP CONSTRAINT "_BoutsToMatts_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoutsToMatts" DROP CONSTRAINT "_BoutsToMatts_B_fkey";

-- AlterTable
ALTER TABLE "Bouts" DROP COLUMN "Matt_ID",
ADD COLUMN     "Mat_ID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "Number_Matts",
ADD COLUMN     "Number_Mats" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Matts";

-- DropTable
DROP TABLE "_BoutsToMatts";

-- CreateTable
CREATE TABLE "VerificationCodes" (
    "ID" SERIAL NOT NULL,
    "Phone_Number" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationCodes_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Mats" (
    "ID" SERIAL NOT NULL,
    "Description" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mats_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "_BoutsToMats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoutsToMats_AB_unique" ON "_BoutsToMats"("A", "B");

-- CreateIndex
CREATE INDEX "_BoutsToMats_B_index" ON "_BoutsToMats"("B");

-- AddForeignKey
ALTER TABLE "_BoutsToMats" ADD CONSTRAINT "_BoutsToMats_A_fkey" FOREIGN KEY ("A") REFERENCES "Bouts"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToMats" ADD CONSTRAINT "_BoutsToMats_B_fkey" FOREIGN KEY ("B") REFERENCES "Mats"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
