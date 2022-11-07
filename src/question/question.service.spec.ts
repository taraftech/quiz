import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { Question } from '../schemas/question.schema';
import { QuestionService } from './question.service';

class ApiServiceMock {
  createQuestion(dto: any) {
    return [];
  }
  getAllQuestions() {
    return [];
  }
  getQuestion(id: string) {
    return null;
  }
  updateQuestion(id: string, dto: any) {
    return [];
  }
  deleteQuestion(id: string) {
    return null;
  }
}
describe('QuestionService', () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: QuestionService,
      useClass: ApiServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, ApiServiceProvider],
    }).compile();
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(QuestionService).toBeDefined();
  });

  it('should call createQuestion method with expected params', async () => {
    const createQuizSpy = jest.spyOn(questionService, 'createQuestion');
    const dto = new CreateQuestionDto();
    questionService.createQuestion(dto);
    expect(createQuizSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findQuestion method', async () => {
    const findOneQuizSpy = jest.spyOn(questionService, 'getQuestion');
    const questionId: string = '';
    questionService.getQuestion(questionId);
    expect(findOneQuizSpy).toHaveBeenCalledWith(questionId);
  });

  it('should call updateQuestion method with expected params', async () => {
    const updateQuestionSpy = jest.spyOn(questionService, 'updateQuestion');
    const questionId = 'questionId';
    const dto = new UpdateQuestionDto();
    questionService.updateQuestion(questionId, dto);
    expect(updateQuestionSpy).toHaveBeenCalledWith(questionId, dto);
  });

  it('should call getAllQuestions method', async () => {
    const result = Question['test'];
    jest
      .spyOn(questionService, 'getAllQuestions')
      .mockImplementation(() => result);

    expect(await questionService.getAllQuestions()).toBe(result);
  });

  it('should delete question by id in param', async () => {
    const deleteQuestionSpy = jest.spyOn(questionService, 'deleteQuestion');
    const questionId = 'quizId';
    questionService.deleteQuestion(questionId);
    expect(deleteQuestionSpy).toHaveBeenCalledWith(questionId);
  });
});
