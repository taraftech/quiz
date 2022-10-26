import { Document, Types } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  quiz: Types.ObjectId;
  answer: string;
  options: string[];
}
