import { API_BASE } from "@/lib/api";
import type {
  Question,
  CreateQuestionPayload,
  UpdateQuestionPayload,
  UpdateOptionsPayload,
} from "@/types/assessment";

// ─── Questions ─────────────────────────────────────────────

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_BASE}/api/questions/getAllQuestions`);
  const json = await res.json();
  if (!json.success) throw new Error("Failed to fetch questions");
  return json.data;
}

export async function createQuestion(
  data: CreateQuestionPayload
): Promise<Question> {
  const res = await fetch(`${API_BASE}/api/questions/createQuestion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to create question");
  return json.data;
}

export async function updateQuestion(
  id: number,
  data: UpdateQuestionPayload
): Promise<Question> {
  const res = await fetch(`${API_BASE}/api/questions/updateQuestion/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to update question");
  return json.data;
}

export async function deleteQuestion(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/questions/deleteQuestion/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to delete question");
}

// ─── Options ───────────────────────────────────────────────

export async function updateOptions(
  questionId: number,
  data: UpdateOptionsPayload
): Promise<Question> {
  const res = await fetch(
    `${API_BASE}/api/options/updateOptions/${questionId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to update options");
  return json.data;
}
