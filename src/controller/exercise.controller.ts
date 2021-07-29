import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseService } from 'src/services/exercise.service';

@Controller('api/v1/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  getAllExercises() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  getSingleExercise(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }
}
