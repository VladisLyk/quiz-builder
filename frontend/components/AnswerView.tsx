import * as React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { AnswerType } from "_/types/answer.type";
import { QuestionType } from "_/types/question.type";

type Props = {
  answer: AnswerType;
  index: number;
  questionType: QuestionType["type"];
};

const AnswerView: React.FC<Props> = ({ answer, index, questionType }) => {
  const isCorrect = !!answer.isCorrect;
  const letter = String.fromCharCode("A".charCodeAt(0) + index);

  return (
    <ListItem
      sx={{
        borderRadius: 1.5,
        mb: 0.5,
        border: "1px solid",
        borderColor: isCorrect ? "success.light" : "divider",
        bgcolor: isCorrect ? "success.light" : "transparent",
        color: isCorrect ? "success.contrastText" : "inherit",
      }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
        {questionType === "SINGLE"
          ? isCorrect
            ? <CheckCircleIcon />
            : <RadioButtonUncheckedIcon />
          : isCorrect
            ? <CheckCircleIcon />
            : <CheckBoxOutlineBlankIcon />}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: isCorrect ? 700 : 400 }}
        primary={`${letter}. ${answer.text}`}
        secondary={isCorrect ? "Correct" : undefined}
        secondaryTypographyProps={{ color: "inherit" }}
      />
    </ListItem>
  );
};

export default AnswerView;
