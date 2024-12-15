-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "isEvery" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TargetEnglish" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "part" TEXT NOT NULL,
    "phonetic" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetEnglish_pkey" PRIMARY KEY ("id")
);
