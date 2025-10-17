import { QuizType } from "_/types/quiz.type";

export function move<T>(arr: T[], from: number, to: number) {
  const copy = [...arr];
  const item = copy.splice(from, 1)[0];
  copy.splice(to, 0, item);
  return copy;
}

export function sanitizeQuiz(values: QuizType): QuizType {
  return {
    ...values,
    title: values.title.trim(),
    questions: values.questions.map((q) => {
      if (q.type === "TEXT") {
        return { text: q.text.trim(), type: q.type };
      }
      const answers = (q.answers ?? [])
        .map((a) => ({ ...a, text: a.text.trim() }))
        .filter((a) => a.text.length > 0);
      return { text: q.text.trim(), type: q.type, answers };
    }),
  };
}