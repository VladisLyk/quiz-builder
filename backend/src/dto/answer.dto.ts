import { IsBoolean, IsString, IsNotEmpty, MaxLength, IsOptional, ValidateIf } from 'class-validator';
import { AnswerInterface } from 'src/types/answer.interface';

export class AnswerDto implements AnswerInterface {
  @IsString() @IsNotEmpty() @MaxLength(500)
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
