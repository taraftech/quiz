import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Question } from './question.schema';

export type OptionDocument = Document & Option;

@Schema()
export class Option {
  @Prop({ required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  @Type(() => Question)
  questionId: Question;

  @Prop()
  isCorrect: boolean;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
