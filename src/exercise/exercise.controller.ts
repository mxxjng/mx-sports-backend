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

@Controller('api/v1/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  getAllExercises() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async getSingleExercise(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOne(id);

    if (!exercise)
      throw new NotFoundException(`Es existiert keine Übung mit der Id: ${id}`);

    return exercise;
  }

  @Post()
  async createExercise(@Body() exerciseData: CreateExerciseDto) {
    return this.exerciseService.create(exerciseData);
  }

  @Delete(':id')
  async deleteExercise(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOne(id);

    if (!exercise) {
      throw new NotFoundException(`Es existiert keine Übung mit der Id: ${id}`);
    }

    const del = await this.exerciseService.deleteOne(id);

    return del;
  }
}
