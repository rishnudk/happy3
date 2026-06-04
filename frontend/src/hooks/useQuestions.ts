import { useState, useCallback, useMemo } from "react"
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateOptions,
} from "@/lib/api/assessment"
import type { Question } from "@/types/assessment"
import { toast } from "sonner"

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchQuestions()
      // Sort questions by questionNo
      const sorted = [...data].sort((a, b) => a.questionNo - b.questionNo)
      setQuestions(sorted)
    } catch (error: any) {
      console.error("Failed to load questions:", error)
      toast.error(error.message || "Failed to load assessment questions")
    } finally {
      setLoading(false)
    }
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category))
    return ["All", ...Array.from(cats)]
  }, [questions])

  const handleDelete = async (id: number) => {
    try {
      setSaving(true)
      await deleteQuestion(id)
      toast.success("Question deleted successfully")
      loadQuestions()
    } catch (error: any) {
      console.error("Delete question error:", error)
      toast.error(error.message || "Failed to delete question")
      throw error
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async (isEdit: boolean, id: number | null, questionPayload: any, optionsPayload: any) => {
    setSaving(true)
    try {
      if (isEdit && id) {
        // Edit mode: Update details first, then options
        await updateQuestion(id, questionPayload)
        await updateOptions(id, optionsPayload)
        toast.success("Question and options updated successfully")
      } else {
        // Add mode: Single endpoint creates both
        await createQuestion({
          ...questionPayload,
          options: optionsPayload.options,
        })
        toast.success("Question created successfully")
      }
      loadQuestions()
    } catch (error: any) {
      console.error("Save question error:", error)
      toast.error(error.message || "Failed to save question")
      throw error
    } finally {
      setSaving(false)
    }
  }

  return {
    questions,
    loading,
    saving,
    categories,
    loadQuestions,
    handleDelete,
    handleSave,
  }
}
