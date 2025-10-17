import { Alert, AlertTitle, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { getQuizzes } from "_/data/quizUtil";
import { QuizType, QuizTypeWithId } from "_/types/quiz.type";
import { CallbackEvent, CallbackType } from "_/types/callback.interface";
import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

const QuizzesPage = () => {
  const [data, setData] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const quizzes = await getQuizzes();
        setData(quizzes);
      } catch (e: any) {
        setErr(e.message ?? "Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCallback = (e: CallbackEvent<QuizType>) => {
    if (e.type === CallbackType.DELETE && e.payload) {
      setData(prev => prev.filter(q => q.id !== e.payload!.id));
    }
  };

  if (loading) {
    return (
      <Stack height={"calc(100vh - 56px)"} width={"100%"} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (err) {
    return (
      <Stack height={"calc(100vh - 56px)"} width={"100%"} alignItems="center" justifyContent="center">
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          <Stack>{err}</Stack>
        </Alert>
      </Stack>
    );
  }

  if (data.length === 0) {
    return (
      <Stack height={"calc(100vh - 56px)"} width={"100%"} alignItems="center" justifyContent="center" gap={1}>
        <Typography variant="h6">Quiz list is empty!</Typography>
        <Typography color="text.secondary" variant="body2">Make your first quiz click to “Create quiz”.</Typography>
      </Stack>
    );
  }

  return (
    <Grid container spacing={2}>
      {data.map((d) => (
        <Grid key={d.id} size={4}>
          <QuizCard data={d as QuizTypeWithId} onCallback={handleCallback} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizzesPage;
