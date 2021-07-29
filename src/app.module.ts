import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseService } from 'src/exercise/exercise.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExerciseController } from 'src/exercise/exercise.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './user/auth.middleware';
import { UserExerciseService } from './userExercise/userExercise.service';
import { UserExerciseController } from './userExercise/userExercise.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ExerciseController,
    UserController,
    UserExerciseController,
  ],
  providers: [
    AppService,
    ExerciseService,
    PrismaService,
    UserService,
    UserExerciseService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/api/v1/user/register', '/api/v1/user/login')
      .forRoutes('/api/v1');
  }
}
