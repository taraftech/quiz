import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Quiz } from 'src/schemas/quiz.schema';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly question: string;

  @IsString()
  @IsNotEmpty()
  readonly quiz: Quiz;
}
