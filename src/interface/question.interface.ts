import { Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  quizId: string;
}
