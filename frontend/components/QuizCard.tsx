import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { deleteQuiz } from "_/data/quizUtil";
import { CallbackHandler, CallbackType } from "_/types/callback.interface";
import { QuizType, QuizTypeWithId } from "_/types/quiz.type";
import { useRouter } from "next/router";

const QuizCard = ({ data, onCallback }: { data: QuizTypeWithId; onCallback: CallbackHandler<QuizType> }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = await deleteQuiz(data.id);
    if (ok) {
      onCallback({ type: CallbackType.DELETE, payload: data });
    } else {
      onCallback({ type: CallbackType.ERROR })
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography>{data.title}</Typography>
        <Typography color="text.secondary" variant="caption">
          {data.questions.length} questions
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => router.push(`/quizzes/${data.id}`)}>View</Button>
        <Button color="error" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
