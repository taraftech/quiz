import { Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: Types.ObjectId;
}
