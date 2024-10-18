/*
  Warnings:

  - A unique constraint covering the columns `[mID]` on the table `message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mID` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "ReplyToNAme" TEXT,
ADD COLUMN     "ReplyToText" TEXT,
ADD COLUMN     "mID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "message_mID_key" ON "message"("mID");
