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

  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Question' })
  // questions: Question[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  // questions: Question[];
  @Prop()
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Question';
    },
  ];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
