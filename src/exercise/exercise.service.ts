import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exercise, Prisma } from '@prisma/client';
import { CreateExerciseDto } from './dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.exercise.findMany({
      include: {
        exerciseCategory: true,
      },
    });
  }

  async findOne(id: string): Promise<Exercise | undefined> {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: id },
      include: { exerciseCategory: true },
    });

    if (!exercise) {
      throw new NotFoundException(`Es existiert keine Übung mit der Id: ${id}`);
    }

    return exercise;
  }

  async deleteOne(id: string): Promise<Exercise | undefined> {
    return await this.prisma.exercise.delete({ where: { id: id } });
  }

  async create(exerciseData: CreateExerciseDto): Promise<Exercise | undefined> {
    const { name, description, unit, image, exerciseCategoryId } = exerciseData;
    return await this.prisma.exercise.create({
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
