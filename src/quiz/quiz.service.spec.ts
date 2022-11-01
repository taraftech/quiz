import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from '../dto/quiz/create-quiz.dto';
import { Quiz } from '../schemas/quiz.schema';
import { UpdateQuizDto } from '../dto/quiz/update-quiz.dto';

class ApiServiceMock {
  createQuiz(dto: any) {
    return [];
  }
  getAllQuizes() {
    return [];
  }
  getQuiz(id: string) {
    return null;
  }
  updateQuiz(id: string, dto: any) {
    return [];
  }
  deleteQuiz(id: string) {
    return null;
  }
}
describe('QuizService', () => {
  let quizService: QuizService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: QuizService,
      useClass: ApiServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService, ApiServiceProvider],
    }).compile();
    quizService = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(QuizService).toBeDefined();
  });

  it('should call createQuiz method with expected params', async () => {
    const createQuizSpy = jest.spyOn(quizService, 'createQuiz');
    const dto = new CreateQuizDto();
    quizService.createQuiz(dto);
    expect(createQuizSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findQuiz method', async () => {
    const findOneQuizSpy = jest.spyOn(quizService, 'getQuiz');
    const quizId: string = '';
    quizService.getQuiz(quizId);
    expect(findOneQuizSpy).toHaveBeenCalledWith(quizId);
  });

  it('should call updateQuiz method with expected params', async () => {
    const updateQuizSpy = jest.spyOn(quizService, 'updateQuiz');
    const quizId = 'quizId';
    const dto = new UpdateQuizDto();
    quizService.updateQuiz(quizId, dto);
    expect(updateQuizSpy).toHaveBeenCalledWith(quizId, dto);
  });

  it('should call getAllQuizes method', async () => {
    const result = Quiz['test'];
    jest.spyOn(quizService, 'getAllQuizes').mockImplementation(() => result);

    expect(await quizService.getAllQuizes()).toBe(result);
  });

  it('should delete quiz by id in param', async () => {
    const deleteQuizSpy = jest.spyOn(quizService, 'deleteQuiz');
    const quizId = 'quizId';
    quizService.deleteQuiz(quizId);
    expect(deleteQuizSpy).toHaveBeenCalledWith(quizId);
  });
});
