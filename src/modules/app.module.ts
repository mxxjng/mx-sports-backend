import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { ExerciseService } from 'src/services/exercise.service';
import { PrismaService } from 'src/services/prisma.service';
import { ExerciseController } from 'src/controller/exercise.controller';

@Module({
  imports: [],
  controllers: [AppController, ExerciseController],
  providers: [AppService, ExerciseService, PrismaService],
})
export class AppModule {}
