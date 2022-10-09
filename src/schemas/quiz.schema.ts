import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);