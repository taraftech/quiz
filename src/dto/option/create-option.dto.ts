import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  private readonly text: string;

  @IsNotEmpty()
  @ApiProperty()
  private readonly questionId: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  private readonly isCorrect: boolean;
}
