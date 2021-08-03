import {
    Controller,
    Get,
    Post,
    Param,
    NotFoundException,
    Body,
    Delete,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto';
import { ExerciseService } from 'src/exercise/exercise.service';
import { User } from 'src/user/user.decorator';

@Controller('api/v1/exercise')
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Get()
    getAllExercises(@User('id') userId: string) {
        console.log(userId);
        return this.exerciseService.findAll();
    }

    @Get('/category')
    getAllCategories(@User('id') userId: string) {
        console.log(userId);
        return this.exerciseService.findAllCategories();
    }

    @Get(':id')
    async getSingleExercise(@Param('id') id: string) {
        return await this.exerciseService.findOne(id);
    }

    @Post()
    async createExercise(@Body() exerciseData: CreateExerciseDto) {
        return this.exerciseService.create(exerciseData);
    }

    @Delete(':id')
    async deleteExercise(@Param('id') id: string) {
        const exercise = await this.exerciseService.findOne(id);

        if (!exercise) {
            throw new NotFoundException(
                `Es existiert keine Übung mit der Id: ${id}`,
            );
        }

        const del = await this.exerciseService.deleteOne(id);

        return del;
    }
}
