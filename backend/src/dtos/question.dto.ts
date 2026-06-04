import { z } from "zod";

const OptionInputSchema = z.object({
  optionText: z.string().min(1, "Option text is required"),
  mark: z.number().int().min(0).max(10),
});

export const CreateQuestionSchema = z.object({
  questionNo: z.number().int().positive(),
  category: z.string().min(1).max(100),
  questionText: z.string().min(1).max(2000),
  options: z.array(OptionInputSchema).min(2, "At least 2 options required"),
});

export const UpdateQuestionSchema = z.object({
  questionNo: z.number().int().positive().optional(),
  category: z.string().min(1).max(100).optional(),
  questionText: z.string().min(1).max(2000).optional(),
});

export type CreateQuestionDTO = z.infer<typeof CreateQuestionSchema>;
export type UpdateQuestionDTO = z.infer<typeof UpdateQuestionSchema>;

export const OptionResponseSchema = z.object({
  id: z.number(),
  optionText: z.string(),
  mark: z.number(),
  questionId: z.number(),
});

export const QuestionResponseSchema = z.object({
  id: z.number(),
  questionNo: z.number(),
  category: z.string(),
  questionText: z.string(),
  options: z.array(OptionResponseSchema).optional(),
});

export type OptionResponseDTO = z.infer<typeof OptionResponseSchema>;
export type QuestionResponseDTO = z.infer<typeof QuestionResponseSchema>;
