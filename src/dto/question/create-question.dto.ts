import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { Quiz } from 'src/schemas/quiz.schema';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty()
  readonly question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly quiz: string;

  @ApiProperty()
  readonly answer: string;

  @ApiProperty()
  readonly options: string[];
}
