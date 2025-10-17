import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { QuizTypeWithId } from '_/types/quiz.type';
import { api } from '_/utils/axios';
import AppLayout from '@/AppLayout';
import QuizViewPage from '@/QuizViewPage';

export default function QuizzesIdPage({ quiz }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!quiz) return;

  return (
    <AppLayout pageTitle={`Quiz "${quiz.title}"`}>
        <QuizViewPage quiz={quiz} />
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  quiz: QuizTypeWithId | null;
}> = async (ctx) => {
  const idParam = Array.isArray(ctx.params?.id) ? ctx.params?.id[0] : ctx.params?.id;
  if (!idParam || isNaN(Number(idParam))) return { notFound: true };

  try {
    const res = await api.get<QuizTypeWithId>(`/quizzes/${idParam}`, {
      validateStatus: () => true,
    });

    if (res.status === 404) return { notFound: true };
    if (res.status < 200 || res.status >= 300) throw new Error(`HTTP ${res.status}`);

    return { props: { quiz: res.data } };
  } catch {
    return { notFound: true };
  }
};
