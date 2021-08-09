import {
    Controller,
    Get,
    Post,
    Param,
    NotFoundException,
    Body,
    Delete,
    Query,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto';
import { ExerciseService } from 'src/exercise/exercise.service';
import { User } from 'src/user/user.decorator';

@Controller('api/v1/exercise')
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Get()
    getAllExercises(@User('id') userId: string, @Query() query) {
        return this.exerciseService.findAll(query);
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
    async createExercise(
        @User() user,
        @Body() exerciseData: CreateExerciseDto,
    ) {
        return this.exerciseService.create(exerciseData, user);
    }

    @Post('/category')
    async createExerciseCategory(@User() user, @Body('name') name) {
        return this.exerciseService.createCategory(name, user);
    }

    @Delete('/category/:id')
    async deleteExerciseCategory(@Param('id') id: string, @User() user) {
        return await this.exerciseService.deleteExerciseCategory(id, user);
    }

    @Delete(':id')
    async deleteExercise(@Param('id') id: string, @User() user) {
        return await this.exerciseService.deleteOne(id, user);
    }
}
