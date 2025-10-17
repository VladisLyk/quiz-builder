import * as React from "react";
import { Box, Stack, Typography, Paper, Divider, Chip } from "@mui/material";
import QuestionView from "./QuestionView";
import { QuizTypeWithId } from "_/types/quiz.type";

const QuizViewPage = ({ quiz }: { quiz: QuizTypeWithId }) => {
  const total = quiz.questions?.length ?? 0;
  const single = quiz.questions.filter(q => q.type === "SINGLE").length;
  const multiple = quiz.questions.filter(q => q.type === "MULTIPLE").length;
  const text = quiz.questions.filter(q => q.type === "TEXT").length;

  return (
    <Box sx={{ mx: "auto" }}>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography variant="subtitle2">
            <strong>ID:</strong> {quiz.id}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Questions:</strong> {total}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`SINGLE: ${single}`} color="success" size="small" variant="outlined" />
            <Chip label={`MULTIPLE: ${multiple}`} color="warning" size="small" variant="outlined" />
            <Chip label={`TEXT: ${text}`} color="default" size="small" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      {/* Questions */}
      <Stack spacing={2}>
        {quiz.questions.map((q, i) => (
          <QuestionView key={i} question={q} index={i} />
        ))}
      </Stack>
    </Box>
  );
};

export default QuizViewPage;
