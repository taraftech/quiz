import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop()
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
