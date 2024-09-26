/*
  Warnings:

  - You are about to drop the column `term` on the `ExamSchedule` table. All the data in the column will be lost.
  - Added the required column `period` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamSchedule" DROP COLUMN "term",
ADD COLUMN     "period" TEXT NOT NULL;
