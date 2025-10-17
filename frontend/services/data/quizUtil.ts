import { QuizType } from "_/types/quiz.type";
import { api } from "_/utils/axios";

export async function getQuizzes(): Promise<QuizType[]> {
    const { data } = await api.get('/quizzes');
    return data;
}

export async function deleteQuiz(id: number): Promise<boolean> {
  const { data, status } = await api.delete<{ success?: boolean }>(`/quizzes/${id}`);
  return data?.success ?? (status >= 200 && status < 300);
}

