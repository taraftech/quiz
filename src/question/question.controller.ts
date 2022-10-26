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
import { response } from 'express';
import { answerDto } from '../dto/answer/answer.dto';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Res() response,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    try {
      const newQuestion = await this.questionService.createQuestion(
        createQuestionDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'question successfully created',
        newQuestion,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: question not create!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateQuestion(
    @Res() response,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param('id') questionId: string,
  ) {
    try {
      const updateQuestion = await this.questionService.updateQuestion(
        questionId,
        updateQuestionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: `question #${questionId} have been successfully updated`,
        updateQuestion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllQuizes(@Res() response) {
    try {
      const questionData = await this.questionService.getAllQuestions();
      return response.status(HttpStatus.OK).json({
        message: 'All questions data found successfully',
        questionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getQuestion(@Res() response, @Param('id') questionId: string) {
    try {
      const questionData = await this.questionService.getQuestion(questionId);
      return response
        .status(HttpStatus.OK)
        .json({ message: `question found successfully`, questionData });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteQuiz(@Res() response, @Param('id') questionId: string) {
    try {
      const deletedQuestion = await this.questionService.deleteQuestion(
        questionId,
      );

      return response.status(HttpStatus.OK).json({
        message: `Question #${questionId} has been successfully deleted`,
        deletedQuestion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('answer/:id')
  async answer(
    @Res() response,
    @Param('id') questionId: string,
    @Body() answerdto: answerDto,
  ) {
    try {
      const answer = await this.questionService.answer(questionId, answerdto);
      return response.status(HttpStatus.OK).json({
        answer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
