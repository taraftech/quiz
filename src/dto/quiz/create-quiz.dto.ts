import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  @ApiProperty()
  readonly description: string;
}
