import { Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  quizId: Types.ObjectId;
  answer: string;
  options: string[];
}
