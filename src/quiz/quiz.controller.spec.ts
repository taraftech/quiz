import { Res } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { number } from 'joi';
import { CreateQuizDto } from '../dto/quiz/create-quiz.dto';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

describe('QuizController', () => {
  let controller: QuizController;

  const mockQuizService = {
    createQuiz: jest.fn((dto) => {
      return {
        id: number,
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [QuizService],
    })
      .overrideProvider(QuizService)
      .useValue(mockQuizService)
      .compile();

    controller = module.get<QuizController>(QuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create Quiz', () => {
  //   // const dto = {"title": "title", "description": "description"}
  //   const dto = new CreateQuizDto();
  //   expect(
  //     controller.createQuiz({
  //       title: 'title',
  //       description: 'description',
  //     }),
  //   ).toEqual({
  //     id: expect.any(Number),
  //     title: 'title',
  //     description: 'description',
  //   });

  //   expect(mockQuizService.createQuiz).toHaveBeenCalled();
  // });
});
