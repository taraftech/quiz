import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Quiz } from './quiz.schema';

export type QuestionDocument = Question & mongoose.Document;

@Schema()
export class Question {
  @Prop()
  id: string;

  @Prop({ required: true })
  question: string;

  @Prop()
  answer: string;

  @Prop()
  options: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' })
  quiz: Quiz;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
