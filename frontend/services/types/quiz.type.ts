import { QuestionType } from "./question.type";

export type QuizType = {
    id?:number;
    title: string;
    questions: QuestionType[];
}

export type QuizTypeWithId = QuizType & { id: number };