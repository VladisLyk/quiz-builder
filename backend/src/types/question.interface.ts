import { AnswerType } from "generated/prisma";
import { AnswerTypeEnum } from "./answer-type.enum";
import { AnswerInterface } from "./answer.interface";

export interface QuestionInterface {
    text: string;
    answers?: AnswerInterface[]
    id?: number;
    type: AnswerType
}