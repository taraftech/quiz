import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from 'src/dto/quiz/create-quiz.dto';
import { UpdateQuizDto } from 'src/dto/quiz/update-quiz.dto';
import { IQuiz } from 'src/interface/quiz.interface';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private QuizModel: Model<IQuiz>) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<IQuiz> {
    const newQuiz = await new this.QuizModel(createQuizDto);
    return newQuiz.save();
  }

  async updateQuiz(
    quizId: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<IQuiz> {
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

  async getAllQuizes(): Promise<IQuiz[]> {
    const quizData = await this.QuizModel.find().populate('questions');
    console.log(quizData);

    if (!quizData || quizData.length == 0) {
      throw new NotFoundException('No Quiz Found!');
    }
    return quizData;
  }

  async getQuiz(quizId: string): Promise<IQuiz> {
    const existingQuiz = await this.QuizModel.findById(quizId).exec();
    if (!existingQuiz) {
      throw new NotFoundException(`Quiz #${quizId} not found!`);
    }
    return existingQuiz;
  }

  async deleteQuiz(quizId: string): Promise<IQuiz> {
    const deletedQuiz = await this.QuizModel.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      throw new NotFoundException(`Quiz #${quizId} not found`);
    }
    return deletedQuiz;
  }
}
