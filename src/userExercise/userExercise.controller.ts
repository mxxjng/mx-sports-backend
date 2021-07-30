import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CreateOneRepMaxDTO, CreateUserExerciseDto } from './dto';
import { UserExerciseService } from './userExercise.service';
import { User } from 'src/user/user.decorator';

@Controller('api/v1/userexercise')
export class UserExerciseController {
  constructor(private readonly userExerciseService: UserExerciseService) {}

  @Get()
  async getExercisesFromUser(@User('id') userId: string) {
    return await this.userExerciseService.getExercisesFromUsers(userId);
  }

  @Delete(':userExerciseId')
  async deleteUserExercise(
    @User('id') userId: string,
    @Param('userExerciseId') userExerciseId: string,
  ) {
    return await this.userExerciseService.deleteUserExercise(
      userId,
      userExerciseId,
    );
  }

  @Get(':exerciseId')
  async getSingleUserExercise(
    @User('id') userId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return await this.userExerciseService.getSingleUserExercise(
      userId,
      exerciseId,
    );
  }

  @Post(':exerciseId')
  async createUserExercise(
    @User('id') userId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return await this.userExerciseService.create(userId, exerciseId);
  }

  @Post('/onerepmax/:userExerciseId')
  async addOneRepMax(
    @User('id') userId: string,
    @Param('userExerciseId') userExerciseId: string,
    @Body() payLoad: CreateOneRepMaxDTO,
  ) {
    return await this.userExerciseService.addOneRepMax(
      userId,
      userExerciseId,
      payLoad,
    );
  }
}
