import * as React from "react";
import { Paper, Stack, Typography, Chip, List } from "@mui/material";
import AnswerView from "./AnswerView";
import { QuestionType } from "_/types/question.type";

type Props = {
  question: QuestionType;
  index: number;
};

const typeColor: Record<QuestionType["type"], "default" | "success" | "warning"> = {
  SINGLE: "success",
  MULTIPLE: "warning",
  TEXT: "default",
};

const QuestionView: React.FC<Props> = ({ question, index }) => {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={700}>
            {index + 1}. {question.text}
          </Typography>
          <Chip
            label={question.type}
            color={typeColor[question.type]}
            size="small"
            variant="filled"
            sx={{ width: "fit-content" }}
          />
        </Stack>
      </Stack>

      {question.type === "TEXT" ? (
        <Typography variant="body2" color="text.secondary">
          Free text answer (no predefined options).
        </Typography>
      ) : (
        <List dense disablePadding>
          {(question.answers ?? []).map((ans, ai) => (
            <AnswerView
              key={ai}
              answer={ans}
              index={ai}
              questionType={question.type}
            />
          ))}
          {(question.answers?.length ?? 0) === 0 && (
            <Typography variant="body2" color="text.secondary">
              No answers provided.
            </Typography>
          )}
        </List>
      )}
    </Paper>
  );
};

export default QuestionView;
