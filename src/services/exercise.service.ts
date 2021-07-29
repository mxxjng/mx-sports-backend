import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Exercise, Prisma } from '@prisma/client';

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

  async findOne(id: string) {
    const exercise = this.prisma.exercise.findUnique({ where: { id: id } });

    if (!exercise) {
      return { message: 'no exercise found' };
    }

    return exercise;
  }
}
