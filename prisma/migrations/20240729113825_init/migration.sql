/*
  Warnings:

  - You are about to drop the column `groupList` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `numberList` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "groupList",
DROP COLUMN "numberList",
ADD COLUMN     "firstGroup" TEXT,
ADD COLUMN     "firstNumber" INTEGER,
ADD COLUMN     "secondGroup" TEXT,
ADD COLUMN     "secondNumber" INTEGER,
ADD COLUMN     "thirdGroup" TEXT,
ADD COLUMN     "thirdNumber" INTEGER;
