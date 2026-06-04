import { api } from "./client";
import type {
  Question,
  CreateQuestionPayload,
  UpdateQuestionPayload,
  UpdateOptionsPayload,
} from "@/types/assessment";

// ─── Questions ─────────────────────────────────────────────

export async function fetchQuestions(): Promise<Question[]> {
  return api.get<Question[]>("/api/questions/");
}

export async function createQuestion(
  data: CreateQuestionPayload
): Promise<Question> {
  return api.post<Question>("/api/questions/", data);
}

export async function updateQuestion(
  id: number,
  data: UpdateQuestionPayload
): Promise<Question> {
  return api.put<Question>(`/api/questions/${id}`, data);
}

export async function deleteQuestion(id: number): Promise<void> {
  return api.delete<void>(`/api/questions/${id}`);
}

// ─── Options ───────────────────────────────────────────────

export async function updateOptions(
  questionId: number,
  data: UpdateOptionsPayload
): Promise<Question> {
  return api.put<Question>(`/api/options/${questionId}`, data);
}

