import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseService } from 'src/exercise/exercise.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExerciseController } from 'src/exercise/exercise.controller';

@Module({
  imports: [],
  controllers: [AppController, ExerciseController],
  providers: [AppService, ExerciseService, PrismaService],
})
export class AppModule {}
