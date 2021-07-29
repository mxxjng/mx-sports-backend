import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseService } from 'src/exercise/exercise.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExerciseController } from 'src/exercise/exercise.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './user/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController, ExerciseController, UserController],
  providers: [AppService, ExerciseService, PrismaService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/v1/exercise');
  }
}
