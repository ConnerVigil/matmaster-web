/*
  Warnings:

  - Added the required column `Contact_Email` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Contact_Phone` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Created_By_ID` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pricing_Regular` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "At_Door_Deadline" TIMESTAMP(3),
ADD COLUMN     "Contact_Email" VARCHAR(100) NOT NULL,
ADD COLUMN     "Contact_Phone" VARCHAR(12) NOT NULL,
ADD COLUMN     "Created_By_ID" INTEGER NOT NULL,
ADD COLUMN     "Description" VARCHAR(300),
ADD COLUMN     "Early_Bird_Deadline" TIMESTAMP(3),
ADD COLUMN     "Facebook_Link" VARCHAR(100),
ADD COLUMN     "Image_URL" TEXT,
ADD COLUMN     "Instagram_Link" VARCHAR(100),
ADD COLUMN     "Last_Minute_Deadline" TIMESTAMP(3),
ADD COLUMN     "Location" VARCHAR(100),
ADD COLUMN     "Pricing_At_Door" DECIMAL(10,2),
ADD COLUMN     "Pricing_Early_Bird" DECIMAL(10,2),
ADD COLUMN     "Pricing_Last_Minute" DECIMAL(10,2),
ADD COLUMN     "Pricing_Regular" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "Regular_Deadline" TIMESTAMP(3),
ADD COLUMN     "Spectator_Pricing" DECIMAL(10,2),
ADD COLUMN     "Status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "Style" VARCHAR(100),
ADD COLUMN     "Terms_And_Conditions" TEXT,
ADD COLUMN     "X_Link" VARCHAR(100);

-- CreateIndex
CREATE INDEX "Event_Status_idx" ON "Event"("Status");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_Created_By_ID_fkey" FOREIGN KEY ("Created_By_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
