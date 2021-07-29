-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "unit" TEXT NOT NULL,
    "execiseCategoryId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExercise" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneRepMax" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "userExerciseId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseData" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userExerciseId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseDataSets" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "userExerciseDataId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Exercise" ADD FOREIGN KEY ("execiseCategoryId") REFERENCES "ExerciseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExercise" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExercise" ADD FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneRepMax" ADD FOREIGN KEY ("userExerciseId") REFERENCES "UserExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD FOREIGN KEY ("userExerciseId") REFERENCES "UserExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseDataSets" ADD FOREIGN KEY ("userExerciseDataId") REFERENCES "UserExerciseData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
