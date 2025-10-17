// dto/create-quiz.dto.ts
import { IsArray, IsNotEmpty, IsString, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDto } from './question.dto';

export class CreateQuizDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsArray() @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
