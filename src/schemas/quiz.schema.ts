import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Question';
    },
  ];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
