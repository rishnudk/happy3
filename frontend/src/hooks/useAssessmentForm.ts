import { useState } from "react"
import type { Question } from "@/types/assessment"

export function useAssessmentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  
  const [formQuestionNo, setFormQuestionNo] = useState<number>(1)
  const [formCategory, setFormCategory] = useState("")
  const [formQuestionText, setFormQuestionText] = useState("")
  const [formOptions, setFormOptions] = useState<{ optionText: string; mark: number }[]>([])

  const openAddModal = (nextNo: number) => {
    setEditingQuestion(null)
    setFormQuestionNo(nextNo)
    setFormCategory("")
    setFormQuestionText("")
    setFormOptions([
      { optionText: "Option A", mark: 5 },
      { optionText: "Option B", mark: 3 },
      { optionText: "Option C", mark: 1 },
      { optionText: "Option D", mark: 0 },
    ])
    setIsModalOpen(true)
  }

  const openEditModal = (q: Question) => {
    setEditingQuestion(q)
    setFormQuestionNo(q.questionNo)
    setFormCategory(q.category)
    setFormQuestionText(q.questionText)
    // Deep copy options
    setFormOptions(q.options.map((opt) => ({ optionText: opt.optionText, mark: opt.mark })))
    setIsModalOpen(true)
  }

  const closeFormModal = () => {
    setIsModalOpen(false)
  }

  const handleOptionChange = (index: number, field: "optionText" | "mark", value: any) => {
    setFormOptions((prev) => {
      const updated = [...prev]
      if (field === "optionText") {
        updated[index] = { ...updated[index], optionText: value }
      } else if (field === "mark") {
        updated[index] = { ...updated[index], mark: Number(value) }
      }
      return updated
    })
  }

  const addOptionRow = () => {
    setFormOptions((prev) => [...prev, { optionText: "", mark: 0 }])
  }

  const removeOptionRow = (index: number) => {
    setFormOptions((prev) => prev.filter((_, i) => i !== index))
  }

  return {
    isModalOpen,
    editingQuestion,
    formQuestionNo,
    setFormQuestionNo,
    formCategory,
    setFormCategory,
    formQuestionText,
    setFormQuestionText,
    formOptions,
    openAddModal,
    openEditModal,
    closeFormModal,
    handleOptionChange,
    addOptionRow,
    removeOptionRow,
  }
}
