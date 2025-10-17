import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayMinSize,
  ValidateNested,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerDto } from './answer.dto';
import { QuestionInterface } from 'src/types/question.interface';
import { AnswerType } from 'generated/prisma';

export class QuestionDto implements QuestionInterface {
  @IsString()
  @IsNotEmpty()
  text: string;

  @ValidateIf(o => o.type !== AnswerType.TEXT)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers?: AnswerDto[];

  @IsEnum(AnswerType)
  type: AnswerType;
}
