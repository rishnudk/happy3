import { z } from "zod";

const AnswerSchema = z.object({
  questionId: z.number().int().positive(),
  optionId: z.number().int().positive(),
  mark: z.number().int().min(0),
});

export const SubmitAssessmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).trim(),
  emailId: z.string().email("Invalid email address").trim(),
  phoneNumber: z.string().min(5, "Phone number too short").max(20).trim(),
  answers: z.array(AnswerSchema).min(1, "At least 1 answer required"),
});

export type SubmitAssessmentDTO = z.infer<typeof SubmitAssessmentSchema>;

export const AssessmentResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  emailId: z.string(),
  phoneNumber: z.string(),
  totalScore: z.number(),
  answers: z.any().optional(),
  createdAt: z.date(),
});

export type AssessmentResponseDTO = z.infer<typeof AssessmentResponseSchema>;
