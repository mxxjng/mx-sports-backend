import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserExercise, Prisma } from '@prisma/client';
import { CreateOneRepMaxDTO, CreateUserExerciseDto } from './dto';

@Injectable()
export class UserExerciseService {
    constructor(private prisma: PrismaService) {}

    // Todo: user can only create one userexercise for one exercise
    async create(userId: string, exerciseId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        const exercise = await this.prisma.exercise.findUnique({
            where: { id: exerciseId },
        });

        if (!user || !exercise) {
            throw new NotFoundException(
                'No User or exercise found to create an exercise for.',
            );
        }

        const userExercise = await this.prisma.userExercise.create({
            data: {
                userId,
                exerciseId,
            },
        });

        return {
            message: 'Übung erfolgreich angelegt.',
            userExercise,
        };
    }

    async getSingleUserExercise(userId: string, userExerciseId: string) {
        const userExercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
            select: {
                id: true,
                oneRepMax: {
                    select: {
                        id: true,
                        date: true,
                        weight: true,
                    },
                    orderBy: {
                        date: 'asc',
                    },
                },
                userId: true,
                exerciseData: {
                    select: {
                        date: true,
                        id: true,
                        userExerciseDataSets: true,
                    },
                    orderBy: {
                        date: 'desc',
                    },
                },
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                exercise: {
                    select: {
                        name: true,
                        description: true,
                        unit: true,
                        image: true,
                        exerciseCategory: true,
                    },
                },
            },
        });

        if (!userExercise) {
            throw new NotFoundException('No exercise found');
        }

        if (userExercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to see this exercise');
        }

        return userExercise;
    }

    async deleteUserExercise(userId: string, userExerciseId: string) {
        const userExercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
        });

        if (!userExercise) {
            throw new NotFoundException('No exercise found');
        }

        if (userExercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to delete this exercise');
        }

        const delUserExercise = await this.prisma.userExercise.delete({
            where: { id: userExerciseId },
        });

        return {
            message: 'Übung erfolgreich gelöscht.',
            userExercise: delUserExercise,
        };
    }

    async getExercisesFromUsers(userId: string, query) {
        let queryArgs = {};

        if (query?.category) {
            queryArgs = {
                userId,
                exercise: {
                    exerciseCategory: {
                        name: query?.category,
                    },
                },
            };
        } else {
            queryArgs = {
                userId,
            };
        }
        return await this.prisma.userExercise.findMany({
            where: queryArgs,
            select: {
                id: true,
                oneRepMax: true,
                exerciseData: {
                    select: {
                        date: true,
                        id: true,
                        userExerciseDataSets: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                exercise: {
                    select: {
                        name: true,
                        description: true,
                        unit: true,
                        image: true,
                        exerciseCategory: true,
                    },
                },
            },
        });
    }

    async addOneRepMax(
        userId,
        userExerciseId: string,
        payLoad: CreateOneRepMaxDTO,
    ) {
        const { date, weight } = payLoad;
        const exercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
        });

        if (!exercise) {
            throw new NotFoundException('No exercise found');
        }

        if (exercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to edit this exercise');
        }

        const add = await this.prisma.oneRepMax.create({
            data: {
                date: new Date(date),
                weight,
                userExerciseId,
            },
        });

        return {
            message: 'Maximalversuch erfolgreich hinzugefügt',
            oneRepMax: add,
        };
    }
}
