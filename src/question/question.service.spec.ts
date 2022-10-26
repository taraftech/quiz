import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Question } from '../schemas/question.schema';
import { Quiz } from '../schemas/quiz.schema';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuizModel = {};
  const mockQuestionModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
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

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
