import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exercise, Prisma } from '@prisma/client';
import { CreateExerciseDto } from './dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exercise.findMany({
      include: {
        exerciseCategory: true,
      },
    });
  }

  async findOne(id: string): Promise<Exercise | undefined> {
    return this.prisma.exercise.findUnique({
      where: { id: id },
      include: { exerciseCategory: true },
    });
  }

  async deleteOne(id: string): Promise<Exercise | undefined> {
    return this.prisma.exercise.delete({ where: { id: id } });
  }

  async create(exerciseData: CreateExerciseDto): Promise<Exercise | undefined> {
    const { name, description, unit, image, exerciseCategoryId } = exerciseData;
    return this.prisma.exercise.create({
      data: {
        name,
        description,
        unit,
        exerciseCategoryId,
        image: image || '...',
      },
    });
  }
}
