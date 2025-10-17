import { AnswerType } from "./answer.type";

export type QuestionType = {
    text: string;
    type: 'SINGLE' | 'MULTIPLE' | 'TEXT';
    answers?: AnswerType[];
}