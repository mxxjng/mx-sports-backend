/*
  Warnings:

  - You are about to drop the column `execiseCategoryId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `exerciseCategoryId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_execiseCategoryId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "execiseCategoryId",
ADD COLUMN     "exerciseCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD FOREIGN KEY ("exerciseCategoryId") REFERENCES "ExerciseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
