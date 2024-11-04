-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "exclusion" TEXT,
    "grade" INTEGER NOT NULL DEFAULT 2,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
