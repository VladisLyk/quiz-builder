import { QuestionInterface } from "./question.interface"

export type QuizInterface = {
    id?: number;
    title: string,
    questions: QuestionInterface[]
}