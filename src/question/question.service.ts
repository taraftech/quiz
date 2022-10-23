import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { answerDto } from 'src/dto/answer/answer.dto';
import { CreateQuestionDto } from 'src/dto/question/create-question.dto';
import { UpdateQuestionDto } from 'src/dto/question/update-question.dto';
import { IQuestion } from 'src/interface/question.interface';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question') private QuestionModel: Model<IQuestion>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<IQuestion> {
    const newQuestion = await new this.QuestionModel(createQuestionDto);
    return newQuestion.save();
  }

  async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<IQuestion> {
    const existingQuestion = await this.QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuestionDto,
      { new: true },
    );
    if (!existingQuestion) {
      throw new NotFoundException(`question #${questionId} not found!`);
    }
    return existingQuestion;
  }

  async getAllQuestions(): Promise<IQuestion[]> {
    const questionData = await this.QuestionModel.find().populate('quizId');
    // .populate('options');
    if (!questionData || questionData.length == 0) {
      throw new NotFoundException('No Question Found!');
    }
    return questionData;
  }

  async getQuestion(questionId: string): Promise<IQuestion> {
    const existingQuestion = await this.QuestionModel.findById(
      questionId,
    ).exec();
    if (!existingQuestion) {
      throw new NotFoundException(`Question #${questionId} not found!`);
    }
    return existingQuestion;
  }

  async deleteQuestion(questionId: string): Promise<IQuestion> {
    const deletedQuestion = await this.QuestionModel.findByIdAndDelete(
      questionId,
    );
    if (!deletedQuestion) {
      throw new NotFoundException(`Question #${questionId} not found`);
    }
    return deletedQuestion;
  }

  async answer(questionId: string, answer: answerDto) {
    const realAnswer = await this.QuestionModel.findById(questionId).exec();

    if (realAnswer['answer'] === answer['answer']) return "it's correct";
    else return "it's uncorrect!";
  }
}
