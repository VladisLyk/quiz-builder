import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { Formik, FieldArray, FormikHelpers } from "formik";
import * as Yup from "yup";
import { api } from "_/utils/axios";
import { QuizType } from "_/types/quiz.type";
import { ErrorDialog } from "./ErrorDialog";
import { QuestionType } from "_/types/question.type";
import { move, sanitizeQuiz } from "_/utils/createutil";
import { useRouter } from "next/router";

const AnswerSchema = Yup.object({
  text: Yup.string().trim().required("Answer cannot be empty"),
  isCorrect: Yup.boolean().optional(),
});

const QuestionSchema = Yup.object({
  text: Yup.string().trim().required("Question is required"),
  type: Yup.mixed<"SINGLE" | "MULTIPLE" | "TEXT">()
    .oneOf(["SINGLE", "MULTIPLE", "TEXT"])
    .required("Type is required"),
  answers: Yup.array()
    .of(AnswerSchema)
    .when("type", ([type], schema) => {
      if (type === "TEXT") return schema.optional();
      return schema
        .min(1, "Add at least one answer")
        .test("has-correct", "Mark at least one correct answer", (answers) =>
          Array.isArray(answers) ? answers.some((a) => a.isCorrect) : false
        )
        .test(
          "single-one-correct",
          "For SINGLE type there must be exactly one correct answer",
          (answers, ctx) => {
            const type = (ctx as any).parent.type;
            if (type !== "SINGLE" || !Array.isArray(answers)) return true;
            return answers.filter((a) => a.isCorrect).length === 1;
          }
        );
    }),
});

const QuizSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  questions: Yup.array().of(QuestionSchema).min(1, "Add at least one question"),
});

const initialValues: QuizType = {
  title: "",
  questions: [
    {
      text: "",
      type: "SINGLE",
      answers: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    },
  ],
};

const QuizCreatePage = () => {
  const router = useRouter();
  const [errorState, setErrorState] = useState<{ open: boolean; msg?: string }>({
    open: false,
  });

  const handleSubmit = async (values: QuizType, helpers: FormikHelpers<QuizType>) => {
    const payload = sanitizeQuiz(values);

    try {
      await api.post("/quizzes", payload);
      router.push("/quizzes");
    } catch (e: any) {
      setErrorState({ open: true, msg: e?.message || "Request error" });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mx: "auto", p: { xs: 2, md: 3 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Formik initialValues={initialValues} validationSchema={QuizSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
            <>
              <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  <TextField
                    name="title"
                    label="Quiz title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && (errors.title as string)}
                    fullWidth
                  />

                  <Divider />

                  <FieldArray name="questions">
                    {(qHelpers) => (
                      <Stack spacing={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6" fontWeight={700}>
                            Questions
                          </Typography>
                          <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                              qHelpers.push({
                                text: "",
                                type: "SINGLE" as const,
                                answers: [
                                  { text: "", isCorrect: true },
                                  { text: "", isCorrect: false },
                                ],
                              })
                            }
                            variant="contained"
                          >
                            Add question
                          </Button>
                        </Stack>

                        {values.questions.map((q, qi) => {
                          const qErr = (errors.questions?.[qi] ?? {}) as any;
                          const qTch = (touched.questions?.[qi] ?? {}) as any;

                          return (
                            <Paper key={qi} variant="outlined" sx={{ p: 2 }}>
                              <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Chip label={`#${qi + 1}`} />
                                    <Typography variant="subtitle1" fontWeight={700}>
                                      Question
                                    </Typography>
                                  </Stack>
                                  <Stack direction="row" spacing={1}>
                                    <Tooltip title="Move up">
                                      <span>
                                        <IconButton
                                          size="small"
                                          disabled={qi === 0}
                                          onClick={() => {
                                            const next = move(values.questions, qi, qi - 1);
                                            setFieldValue("questions", next);
                                          }}
                                        >
                                          <ArrowUpward fontSize="small" />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                    <Tooltip title="Move down">
                                      <span>
                                        <IconButton
                                          size="small"
                                          disabled={qi === values.questions.length - 1}
                                          onClick={() => {
                                            const next = move(values.questions, qi, qi + 1);
                                            setFieldValue("questions", next);
                                          }}
                                        >
                                          <ArrowDownward fontSize="small" />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                    <Tooltip title="Duplicate">
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          qHelpers.insert(qi + 1, JSON.parse(JSON.stringify(q)));
                                        }}
                                      >
                                        <CopyIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton size="small" color="error" onClick={() => qHelpers.remove(qi)}>
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                </Stack>

                                <TextField
                                  name={`questions.${qi}.text`}
                                  label="Question text"
                                  value={q.text}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={Boolean(qTch.text && qErr?.text)}
                                  helperText={qTch.text && qErr?.text}
                                  fullWidth
                                />

                                <FormControl fullWidth error={Boolean(qTch.type && qErr?.type)}>
                                  <InputLabel id={`questions.${qi}.type.label`}>Type</InputLabel>
                                  <Select
                                    labelId={`questions.${qi}.type.label`}
                                    label="Type"
                                    name={`questions.${qi}.type`}
                                    value={q.type}
                                    onChange={(e) => {
                                      const nextType = e.target.value as QuestionType["type"];
                                      setFieldValue(`questions.${qi}.type`, nextType);

                                      if (nextType === "TEXT") {
                                        setFieldValue(`questions.${qi}.answers`, []);
                                      } else if (!q.answers || q.answers.length === 0) {
                                        setFieldValue(`questions.${qi}.answers`, [
                                          { text: "", isCorrect: true },
                                          { text: "", isCorrect: false },
                                        ]);
                                      }
                                    }}
                                  >
                                    <MenuItem value="SINGLE">Single correct (SINGLE)</MenuItem>
                                    <MenuItem value="MULTIPLE">Multiple correct (MULTIPLE)</MenuItem>
                                    <MenuItem value="TEXT">Free text (TEXT)</MenuItem>
                                  </Select>
                                  <FormHelperText>{qTch.type && qErr?.type}</FormHelperText>
                                </FormControl>

                                {q.type !== "TEXT" && (
                                  <FieldArray name={`questions.${qi}.answers`}>
                                    {(aHelpers) => {
                                      const answers = q.answers ?? [];
                                      const aErrs = (qErr?.answers ?? []) as any[];
                                      const aTchs = (qTch?.answers ?? []) as any[];

                                      return (
                                        <Stack spacing={2}>
                                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Typography fontWeight={700}>Answer options</Typography>
                                            <Button
                                              startIcon={<AddIcon />}
                                              onClick={() => aHelpers.push({ text: "", isCorrect: false })}
                                              variant="outlined"
                                              size="small"
                                            >
                                              Add answer
                                            </Button>
                                          </Stack>

                                          {answers.map((a, ai) => {
                                            const aErr = aErrs?.[ai] ?? {};
                                            const aTch = aTchs?.[ai] ?? {};
                                            return (
                                              <Paper key={ai} variant="outlined" sx={{ p: 1.5 }}>
                                                <Stack
                                                  direction={{ xs: "column", md: "row" }}
                                                  spacing={1.5}
                                                  alignItems="center"
                                                >
                                                  <TextField
                                                    name={`questions.${qi}.answers.${ai}.text`}
                                                    label={`Answer #${ai + 1}`}
                                                    value={a.text}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(aTch.text && aErr?.text)}
                                                    helperText={aTch.text && aErr?.text}
                                                    fullWidth
                                                  />
                                                  <FormControlLabel
                                                    control={
                                                      <Checkbox
                                                        checked={!!a.isCorrect}
                                                        onChange={(e) => {
                                                          if (q.type === "SINGLE") {
                                                            const updated = answers.map((ans, idx) => ({
                                                              ...ans,
                                                              isCorrect: idx === ai ? e.target.checked : false,
                                                            }));
                                                            setFieldValue(`questions.${qi}.answers`, updated);
                                                          } else {
                                                            setFieldValue(
                                                              `questions.${qi}.answers.${ai}.isCorrect`,
                                                              e.target.checked
                                                            );
                                                          }
                                                        }}
                                                      />
                                                    }
                                                    label="Correct"
                                                  />
                                                  <IconButton
                                                    color="error"
                                                    onClick={() => aHelpers.remove(ai)}
                                                    aria-label="Delete answer"
                                                  >
                                                    <DeleteIcon />
                                                  </IconButton>
                                                </Stack>
                                              </Paper>
                                            );
                                          })}

                                          {typeof qErr?.answers === "string" && (
                                            <FormHelperText error>{qErr.answers}</FormHelperText>
                                          )}
                                          {Array.isArray(qErr?.answers) === false && qErr?.answers && (
                                            <FormHelperText error>{String(qErr.answers)}</FormHelperText>
                                          )}
                                        </Stack>
                                      );
                                    }}
                                  </FieldArray>
                                )}
                              </Stack>
                            </Paper>
                          );
                        })}
                      </Stack>
                    )}
                  </FieldArray>

                  {typeof (errors.questions as any) === "string" && (
                    <FormHelperText error>{errors.questions as any}</FormHelperText>
                  )}

                  <Divider />

                  <Stack direction="row" gap={2} justifyContent="flex-end">
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      Save quiz
                    </Button>
                  </Stack>
                </Stack>
              </form>

              <ErrorDialog
                open={errorState.open}
                title="Failed to save quiz"
                description={errorState.msg}
                onClose={() => setErrorState({ open: false })}
              />
            </>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default QuizCreatePage;
