import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Quiz } from '../schemas/quiz.schema';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

describe('QuizController', () => {
  let quizController: QuizController;
  let spyService: QuizService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: QuizService,
      useFactory: () => ({
        createQuiz: jest.fn(() => []),
        updateQuiz: jest.fn(()=> []),
        getQuiz: jest.fn(() => {}),
        getQuizById: jest.fn(() => {}),
        deleteQuiz: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        QuizService,
        { provide: getModelToken(Quiz.name), useValue: jest.fn() },
      ],
    }).compile();

    quizController = module.get<QuizController>(QuizController);
    spyService = module.get<QuizService>(QuizService);
  });

  // it('calling getQuiz method', async () => {
  //   await quizController.getQuiz([]);
  //   expect(spyService.getAllQuizes).toHaveBeenCalled();
  // });

  describe("* Find One By Id", () => {
    it("should return an entity of client if successful", async () => {
      const expectedResult = new clientD();
      const mockNumberToSatisfyParameters = 0;
      jest.spyOn(clientService, "findOneById").mockResolvedValue(expectedResult);
      expect(await clientController.findOneById(mockNumberToSatisfyParameters)).toBe(expectedResult);
    });

  afterEach(() => {
    jest.resetAllMocks();
 });
});
