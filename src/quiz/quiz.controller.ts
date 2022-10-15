import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateQuizDto } from '../dto/quiz/create-quiz.dto';
import { UpdateQuizDto } from '../dto/quiz/update-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Res() response, @Body() createQuizDto: CreateQuizDto) {
    try {
      const newQuiz = await this.quizService.createQuiz(createQuizDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Quiz have been created successfully',
        newQuiz,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Quiz not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateQuiz(
    @Res() response,
    @Param('id') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    try {
      const existingQuiz = await this.quizService.updateQuiz(
        quizId,
        updateQuizDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'quiz has been successfully update',
        existingQuiz,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllQuizes(@Res() response) {
    try {
      const quizData = await this.quizService.getAllQuizes();
      return response.status(HttpStatus.OK).json({
        message: 'All quizes data found successfully',
        quizData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getQuiz(@Res() response, @Param('id') quizId: string) {
    try {
      const quizData = await this.quizService.getQuiz(quizId);
      return response.status(HttpStatus.OK).json({
        message: 'Quiz found successfully',
        quizData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteQuiz(@Res() response, @Param('id') quizId: string) {
    try {
      const deletedQuiz = await this.quizService.deleteQuiz(quizId);

      return response.status(HttpStatus.OK).json({
        message: `Quiz #${quizId} has been successfully deleted`,
        deletedQuiz,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
