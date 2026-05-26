"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronRight,
  FileText,
  Info,
  List,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_QUESTION_LENGTH = 500;

type OptionRow = {
  localId: string;
  optionText: string;
  mark: string;
  isCorrect: boolean;
};

type QuestionRecord = {
  id: number;
  questionNo: number;
  category: string;
  questionText: string;
  options: { id: number; optionText: string; mark: number }[];
};

function emptyOption(): OptionRow {
  return {
    localId: crypto.randomUUID(),
    optionText: "",
    mark: "",
    isCorrect: false,
  };
}

function totalMarks(options: { mark: number }[]) {
  return options.reduce((sum, o) => sum + (o.mark ?? 0), 0);
}

export function AddQuestionDashboard() {
  const [questionText, setQuestionText] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState<OptionRow[]>([
    emptyOption(),
    emptyOption(),
    emptyOption(),
    emptyOption(),
  ]);
  const [questions, setQuestions] = useState<QuestionRecord[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch(`${API_BASE}/api/questions/getAllQuestions`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setQuestions(json.data ?? []);
      }
    } catch {
      toast.error("Failed to load questions");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const resetForm = () => {
    setQuestionText("");
    setCategory("");
    setOptions([
      emptyOption(),
      emptyOption(),
      emptyOption(),
      emptyOption(),
    ]);
    setEditingId(null);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, emptyOption()]);
  };

  const handleRemoveOption = (localId: string) => {
    setOptions((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((o) => o.localId !== localId);
      if (!next.some((o) => o.isCorrect) && next.length > 0) {
        next[0].isCorrect = true;
      }
      return next;
    });
  };

  const handleCorrectChange = (localId: string) => {
    setOptions((prev) =>
      prev.map((o) => ({ ...o, isCorrect: o.localId === localId }))
    );
  };

  const validateForm = () => {
    if (!questionText.trim()) {
      toast.error("Question is required");
      return false;
    }
    if (!category.trim()) {
      toast.error("Option category is required");
      return false;
    }
    const filled = options.filter((o) => o.optionText.trim());
    if (filled.length === 0) {
      toast.error("Add at least one option");
      return false;
    }
    if (!filled.some((o) => o.isCorrect)) {
      toast.error("Select the correct answer");
      return false;
    }
    for (const o of filled) {
      if (o.mark === "" || Number.isNaN(Number(o.mark))) {
        toast.error("Enter a valid mark for each option");
        return false;
      }
    }
    return true;
  };

  const buildPayload = () => {
    const filled = options.filter((o) => o.optionText.trim());
    const nextNo =
      questions.length > 0
        ? Math.max(...questions.map((q) => q.questionNo)) + 1
        : 1;

    return {
      questionNo: editingId
        ? (questions.find((q) => q.id === editingId)?.questionNo ?? nextNo)
        : nextNo,
      category: category.trim(),
      questionText: questionText.trim(),
      options: filled.map((o) => ({
        optionText: o.optionText.trim(),
        mark: Number(o.mark),
      })),
    };
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = buildPayload();

      if (editingId) {
        const res = await fetch(
          `${API_BASE}/api/questions/updateQuestion/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              questionNo: payload.questionNo,
              category: payload.category,
              questionText: payload.questionText,
            }),
          }
        );
        const json = await res.json();
        if (!json.success) throw new Error("Update failed");

        const optRes = await fetch(
          `${API_BASE}/api/options/updateOptions/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ options: payload.options }),
          }
        );
        const optJson = await optRes.json();
        if (!optJson.success) throw new Error("Options update failed");

        toast.success("Question updated");
      } else {
        const res = await fetch(
          `${API_BASE}/api/questions/createQuestion`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );
        const json = await res.json();
        if (!json.success) throw new Error("Create failed");
        toast.success("Question saved");
      }

      resetForm();
      fetchQuestions();
    } catch {
      toast.error(editingId ? "Failed to update question" : "Failed to save question");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (q: QuestionRecord) => {
    setEditingId(q.id);
    setQuestionText(q.questionText);
    setCategory(q.category);
    const rows =
      q.options.length > 0
        ? q.options.map((o) => ({
            localId: crypto.randomUUID(),
            optionText: o.optionText,
            mark: String(o.mark),
            isCorrect: false,
          }))
        : [emptyOption()];
    if (rows.length > 0) {
      const maxMark = Math.max(...q.options.map((o) => o.mark));
      const correctIdx = q.options.findIndex((o) => o.mark === maxMark);
      if (correctIdx >= 0) rows[correctIdx].isCorrect = true;
      else rows[0].isCorrect = true;
    }
    while (rows.length < 4) rows.push(emptyOption());
    setOptions(rows);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this question?")) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/questions/deleteQuestion/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      const json = await res.json();
      if (!json.success) throw new Error();
      toast.success("Question deleted");
      if (editingId === id) resetForm();
      fetchQuestions();
    } catch {
      toast.error("Failed to delete question");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Questions
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-1 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          >
            <Link
              href="/admin/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <span className="text-foreground/80">Questions</span>
            <ChevronRight className="size-3.5 shrink-0" />
            <span className="font-medium text-primary">Add Question</span>
          </nav>
        </div>
        <Button
          type="button"
          className="h-10 shrink-0 gap-2 rounded-xl px-5 shadow-md shadow-primary/20"
          onClick={resetForm}
        >
          <Plus className="size-4" />
          Add Question
        </Button>
      </div>

      {/* Top row: Question details + Options */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Question Details */}
        <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)] lg:col-span-1">
          <CardHeader className="border-b border-border/30 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <FileText className="size-4 text-primary" />
              Question Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="question">
                Question <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Textarea
                  id="question"
                  placeholder="Enter your question here..."
                  value={questionText}
                  maxLength={MAX_QUESTION_LENGTH}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="min-h-[140px] resize-none pr-14"
                />
                <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
                  {questionText.length}/{MAX_QUESTION_LENGTH}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">
                Option Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                placeholder="Enter option category (e.g., Cities, Colors, Fruits)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 rounded-lg bg-white/80"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                className="h-10 gap-2 rounded-xl px-6 shadow-md shadow-primary/20"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="size-4" />
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Question"
                    : "Save Question"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)] lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <List className="size-4 text-primary" />
              Options
            </CardTitle>
            <CardAction>
              <Button
                type="button"
                variant="outline"
                className="h-9 gap-1.5 rounded-xl border-primary text-primary hover:bg-primary/5"
                onClick={handleAddOption}
              >
                <Plus className="size-4" />
                Add Option
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="overflow-x-auto rounded-xl border border-border/40">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/40 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <th className="w-10 px-3 py-3">#</th>
                    <th className="px-3 py-3">
                      Option Text <span className="text-destructive">*</span>
                    </th>
                    <th className="w-28 px-3 py-3 text-center">
                      Correct Answer
                    </th>
                    <th className="w-28 px-3 py-3">
                      Mark <span className="text-destructive">*</span>
                    </th>
                    <th className="w-24 px-3 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((row, index) => (
                    <tr
                      key={row.localId}
                      className="border-b border-border/20 last:border-0"
                    >
                      <td className="px-3 py-3 font-medium text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3">
                        <Input
                          placeholder="Enter option text"
                          value={row.optionText}
                          onChange={(e) =>
                            setOptions((prev) =>
                              prev.map((o) =>
                                o.localId === row.localId
                                  ? { ...o, optionText: e.target.value }
                                  : o
                              )
                            )
                          }
                          className="h-9 rounded-lg bg-white"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={row.isCorrect}
                          onChange={() => handleCorrectChange(row.localId)}
                          className="size-4 cursor-pointer accent-primary"
                          aria-label={`Correct answer option ${index + 1}`}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <Input
                          type="number"
                          min={0}
                          placeholder="Enter mark"
                          value={row.mark}
                          onChange={(e) =>
                            setOptions((prev) =>
                              prev.map((o) =>
                                o.localId === row.localId
                                  ? { ...o, mark: e.target.value }
                                  : o
                              )
                            )
                          }
                          className="h-9 rounded-lg bg-white"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50"
                            aria-label="Edit option"
                            onClick={() => handleCorrectChange(row.localId)}
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 disabled:opacity-40"
                            aria-label="Delete option"
                            disabled={options.length <= 1}
                            onClick={() => handleRemoveOption(row.localId)}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground/90">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                Select the correct answer and assign marks. The total marks will
                be the sum of all options.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions list */}
      <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardHeader className="border-b border-border/30 pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <List className="size-4 text-primary" />
            Questions List
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-muted/40 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <th className="w-12 px-4 py-3">#</th>
                  <th className="px-4 py-3">Question</th>
                  <th className="w-40 px-4 py-3">Option Category</th>
                  <th className="w-28 px-4 py-3">Total Marks</th>
                  <th className="w-28 px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      Loading questions...
                    </td>
                  </tr>
                ) : questions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No questions yet. Create your first question above.
                    </td>
                  </tr>
                ) : (
                  questions.map((q, index) => (
                    <tr
                      key={q.id}
                      className={cn(
                        "border-b border-border/20 transition-colors last:border-0 hover:bg-muted/20",
                        editingId === q.id && "bg-primary/5"
                      )}
                    >
                      <td className="px-4 py-3.5 font-medium text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="max-w-md px-4 py-3.5 font-medium text-foreground">
                        {q.questionText}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {q.category}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-primary">
                        {totalMarks(q.options)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50"
                            aria-label="Edit question"
                            onClick={() => handleEdit(q)}
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                            aria-label="Delete question"
                            onClick={() => handleDelete(q.id)}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
