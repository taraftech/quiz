import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateQuizDto {
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    readonly description: string
}