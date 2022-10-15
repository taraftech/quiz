import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Quiz } from './quiz.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Quiz.name })
  @Type(() => Quiz)
  quizId: Quiz;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
