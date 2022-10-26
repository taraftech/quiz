import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from '../dto/quiz/create-quiz.dto';
import { UpdateQuizDto } from '../dto/quiz/update-quiz.dto';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private QuizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private QuestionModel: Model<QuestionDocument>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const newQuiz = new this.QuizModel(createQuizDto);
    return newQuiz.save();
  }

  async updateQuiz(
    quizId: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    const existingQuiz = await this.QuizModel.findByIdAndUpdate(
      quizId,
      updateQuizDto,
      { new: true },
    );
    if (!existingQuiz) {
      throw new NotFoundException(`quiz #${quizId} is not found!`);
    }
    return existingQuiz;
  }

  async getAllQuizes(): Promise<Quiz[]> {
    const quizData = await this.QuizModel.find();
    console.log(quizData);

    if (!quizData || quizData.length == 0) {
      throw new NotFoundException('No Quiz Found!');
    }
    return quizData;
  }

  async getQuiz(quizId: string) {
    const existingQuiz = await this.QuizModel.findById(quizId).exec();
    if (!existingQuiz) {
      throw new NotFoundException(`Quiz #${quizId} not found!`);
    } else {
      var id = existingQuiz['_id'];
      var completeQuiz = [];
      completeQuiz.push(existingQuiz);

      const questions = await this.QuestionModel.find({ quiz: id }).exec();
      completeQuiz.push(questions);
    }
    return completeQuiz;
  }

  async deleteQuiz(quizId: string): Promise<Quiz> {
    const deletedQuiz = await this.QuizModel.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      throw new NotFoundException(`Quiz #${quizId} not found`);
    }
    return deletedQuiz;
  }
}
