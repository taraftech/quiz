import { Document } from 'mongoose';
import { Question } from 'src/schemas/question.schema';

export interface IOption extends Document {
  text: string;
  questionId: Question;
  isCorrect: boolean;
}
