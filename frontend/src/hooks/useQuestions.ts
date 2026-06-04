import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateOptions,
} from "@/lib/api/assessment";
import { toast } from "sonner";

export function useQuestions() {
  const queryClient = useQueryClient();

  const { data: questions = [], isLoading: loading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const data = await fetchQuestions();
      return [...data].sort((a, b) => a.questionNo - b.questionNo);
    },
  });

  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category));
    return ["All", ...Array.from(cats)];
  }, [questions]);

  const deleteMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.success("Question deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete question");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      isEdit,
      id,
      questionPayload,
      optionsPayload,
    }: {
      isEdit: boolean;
      id: number | null;
      questionPayload: any;
      optionsPayload: any;
    }) => {
      if (isEdit && id) {
        await updateQuestion(id, questionPayload);
        await updateOptions(id, optionsPayload);
        return "Question and options updated successfully";
      } else {
        await createQuestion({
          ...questionPayload,
          options: optionsPayload.options,
        });
        return "Question created successfully";
      }
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save question");
    },
  });

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleSave = async (
    isEdit: boolean,
    id: number | null,
    questionPayload: any,
    optionsPayload: any
  ) => {
    await saveMutation.mutateAsync({
      isEdit,
      id,
      questionPayload,
      optionsPayload,
    });
  };

  return {
    questions,
    loading,
    saving: saveMutation.isPending || deleteMutation.isPending,
    categories,
    handleDelete,
    handleSave,
  };
}
