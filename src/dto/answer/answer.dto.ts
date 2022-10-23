import { ApiProperty } from '@nestjs/swagger';

export class answerDto {
  @ApiProperty()
  readonly answer: string;
}
