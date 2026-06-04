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
