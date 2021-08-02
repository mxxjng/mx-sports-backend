import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserExercise, Prisma } from '@prisma/client';
import { CreateOneRepMaxDTO, CreateUserExerciseDto } from './dto';

@Injectable()
export class ExerciseDataService {
    constructor(private prisma: PrismaService) {}

    // Todo: user can only create one userexercise for one exercise
    async create(userId: string, userExerciseId: string, payLoad) {
        const { date } = payLoad;
        const userExercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
        });

        if (!userExercise) {
            throw new NotFoundException('No exercise found');
        }

        if (userExercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to edit this exercise');
        }
        const c = await this.prisma.userExerciseData.create({
            data: {
                date: new Date(date),
                userExerciseId,
            },
        });

        return {
            message: 'Datensatz erfolgreich angelegt',
            data: c,
        };
    }

    async createSet(
        userId: string,
        userExerciseId: string,
        exerciseDataId,
        payLoad,
    ) {
        const { reps, weight, setNumber } = payLoad;
        const userExercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
            include: {
                exerciseData: true,
            },
        });

        if (!userExercise) {
            throw new NotFoundException('No exercise found');
        }

        if (userExercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to edit this exercise');
        }

        const findDataSet = userExercise.exerciseData.find(
            (e) => e.id === exerciseDataId,
        );

        if (!findDataSet) {
            throw new NotFoundException('No exercise data found');
        }

        const c = await this.prisma.userExerciseDataSets.create({
            data: {
                weight,
                reps,
                setNumber,
                userExerciseDataId: exerciseDataId,
            },
        });

        return {
            message: 'Datensatz erfolgreich angelegt',
            data: c,
        };
    }

    async deleteSet(
        userId: string,
        userExerciseId: string,
        exerciseDataId,
        userExerciseDataSetId,
    ) {
        const userExercise = await this.prisma.userExercise.findUnique({
            where: { id: userExerciseId },
            include: {
                exerciseData: true,
            },
        });

        if (!userExercise) {
            throw new NotFoundException('No exercise found');
        }

        if (userExercise.userId !== userId) {
            throw new ForbiddenException('Not allowed to edit this exercise');
        }

        const findDataSet = userExercise.exerciseData.find(
            (e) => e.id === exerciseDataId,
        );

        if (!findDataSet) {
            throw new NotFoundException('No exercise data found');
        }

        const dataSet = await this.prisma.userExerciseDataSets.findUnique({
            where: { id: userExerciseDataSetId },
        });

        if (!dataSet) {
            throw new NotFoundException('No dataset found');
        }

        const deleteDataSet = await this.prisma.userExerciseDataSets.delete({
            where: { id: userExerciseDataSetId },
        });

        return {
            message: 'Datensatz erfolgreich gelöscht',
            data: deleteDataSet,
        };
    }
}
