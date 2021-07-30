import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CreateOneRepMaxDTO, CreateUserExerciseDto } from './dto';
import { ExerciseDataService } from './exerciseData.service';
import { User } from 'src/user/user.decorator';

// Todo maybe rename to workout?
@Controller('api/v1/exercisedata')
export class ExerciseDataController {
  constructor(private readonly exerciseDataService: ExerciseDataService) {}

  @Post(':userExerciseId')
  async createUserExerciseData(
    @User('id') userId: string,
    @Param('userExerciseId') exerciseId: string,
    @Body() payLoad,
  ) {
    return await this.exerciseDataService.create(userId, exerciseId, payLoad);
  }

  @Post('/set/:userExerciseId/:exerciseDataId')
  async createUserExerciseDataSet(
    @User('id') userId: string,
    @Param('userExerciseId') userExerciseId: string,
    @Param('exerciseDataId') exerciseDataId: string,
    @Body() payLoad,
  ) {
    return await this.exerciseDataService.createSet(
      userId,
      userExerciseId,
      exerciseDataId,
      payLoad,
    );
  }

  @Delete('/set/:userExerciseId/:exerciseDataId/:exerciseDataSetId')
  async deleteUserExerciseDataSet(
    @User('id') userId: string,
    @Param('userExerciseId') userExerciseId: string,
    @Param('exerciseDataId') exerciseDataId: string,
    @Param('exerciseDataSetId') exerciseDataSetId: string,
  ) {
    return await this.exerciseDataService.deleteSet(
      userId,
      userExerciseId,
      exerciseDataId,
      exerciseDataSetId,
    );
  }
}
