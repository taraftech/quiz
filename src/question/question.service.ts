import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { answerDto } from '../dto/answer/answer.dto';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { IQuestion } from '../interface/question.interface';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private QuestionModel: Model<QuestionDocument>,
    @InjectModel(Quiz.name) private QuizModel: Model<QuizDocument>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const newQuestion = new this.QuestionModel(createQuestionDto);
    return await newQuestion.save();
  }

  async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
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

  async getAllQuestions(): Promise<Question[]> {
    const m = await this.QuizModel.find();
    console.log(m);

    const questionData = await this.QuestionModel.find().populate('quiz');
    // .populate('options');
    if (!questionData || questionData.length == 0) {
      throw new NotFoundException('No Question Found!');
    }
    return questionData;
  }

  async getQuestion(questionId: string): Promise<Question> {
    const existingQuestion = await this.QuestionModel.findById(questionId)
      .populate('quiz')
      .exec();
    if (!existingQuestion) {
      throw new NotFoundException(`Question #${questionId} not found!`);
    }
    return existingQuestion;
  }

  async deleteQuestion(questionId: string): Promise<Question> {
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
