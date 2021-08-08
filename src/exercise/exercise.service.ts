import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exercise, Prisma } from '@prisma/client';
import { CreateExerciseDto } from './dto';

@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) {}

    async findAllCategories() {
        return await this.prisma.exerciseCategory.findMany();
    }

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
            throw new NotFoundException(
                `Es existiert keine Übung mit der Id: ${id}`,
            );
        }

        return exercise;
    }

    async deleteOne(id: string, user): Promise<Exercise | undefined> {
        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'You dont have the rights to do this.',
            );
        }

        const exercise = await this.prisma.exercise.findUnique({
            where: { id },
        });

        if (!exercise) {
            throw new NotFoundException(
                `Es existiert keine Übung mit der Id: ${id}`,
            );
        }

        return await this.prisma.exercise.delete({ where: { id: id } });
    }

    async deleteExerciseCategory(id, user) {
        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'You dont have the rights to do this.',
            );
        }

        const exerciseCategory = await this.prisma.exerciseCategory.findUnique({
            where: { id },
        });

        if (!exerciseCategory) {
            throw new NotFoundException('No exercise category found');
        }

        return await this.prisma.exerciseCategory.delete({ where: { id } });
    }

    async createCategory(name, user) {
        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'You dont have the rights to do this.',
            );
        }

        return await this.prisma.exerciseCategory.create({
            data: {
                name,
            },
        });
    }

    async create(
        exerciseData: CreateExerciseDto,
        user,
    ): Promise<Exercise | undefined> {
        const { name, description, unit, image, exerciseCategoryId } =
            exerciseData;

        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'You dont have the rights to do this.',
            );
        }

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
