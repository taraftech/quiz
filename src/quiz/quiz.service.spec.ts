import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { string } from 'joi';
import { Question } from '../schemas/question.schema';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;

  const mockQuizModel = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((quiz) => Promise.resolve({ id: string, ...quiz })),
  };
  const mockQuestionModel = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: getModelToken(Quiz.name),
          useValue: mockQuizModel,
        },
        {
          provide: getModelToken(Question.name),
          useValue: mockQuestionModel,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new quiz record and return that', async () => {
    expect(
      await service.createQuiz({ title: 'title', description: 'description' }),
    ).toEqual({
      id: expect.any(Number),
      title: 'title',
      description: 'description',
    });
  });
});
