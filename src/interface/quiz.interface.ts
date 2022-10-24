import { Document, Types } from 'mongoose';
import { Question } from 'src/schemas/question.schema';

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: Question[];
}
