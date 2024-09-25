-- CreateTable
CREATE TABLE "ExamSchedule" (
    "id" SERIAL NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT 2,
    "term" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "timetable" TEXT[],
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamSchedule" ADD CONSTRAINT "ExamSchedule_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
