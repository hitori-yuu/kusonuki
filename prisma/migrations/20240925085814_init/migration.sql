/*
  Warnings:

  - Added the required column `date` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamSchedule" ADD COLUMN     "date" DATE NOT NULL;
