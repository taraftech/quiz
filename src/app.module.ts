import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/quiz'), QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
