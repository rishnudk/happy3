"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useQuestions } from "@/hooks/useQuestions"
import { useAssessmentForm } from "@/hooks/useAssessmentForm"
import { QuestionList } from "./components/QuestionList"
import { QuestionForm } from "./components/QuestionForm"
import { SubmissionViewer } from "./components/SubmissionViewer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon, Loader2Icon } from "lucide-react"
import type { Question } from "@/types/assessment"

export default function AdminAssessmentPage() {
  const {
    questions,
    loading,
    saving,
    categories,
    handleDelete,
    handleSave,
  } = useQuestions()

  const formState = useAssessmentForm()

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [deletingQuestion, setDeletingQuestion] = React.useState<Question | null>(null)

  const stats = React.useMemo(() => {
    const total = questions.length
    const catsCount = categories.length - 1
    const totalMaxMarks = questions.reduce((sum, q) => {
      if (!q.options || q.options.length === 0) return sum
      const maxOpt = Math.max(...q.options.map((o) => o.mark))
      return sum + (maxOpt > 0 ? maxOpt : 0)
    }, 0)
    return { total, catsCount, totalMaxMarks }
  }, [questions, categories])

  const openDeleteModal = (q: Question) => {
    setDeletingQuestion(q)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (deletingQuestion) {
      try {
        await handleDelete(deletingQuestion.id)
        setIsDeleteOpen(false)
        setDeletingQuestion(null)
      } catch (e) {
        // Handle error if needed
      }
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Assessment Questions" />
        <QuestionList
          questions={questions}
          loading={loading}
          categories={categories}
          stats={stats}
          handleAddClick={() => {
            const nextNo = questions.length > 0 ? Math.max(...questions.map((q) => q.questionNo)) + 1 : 1
            formState.openAddModal(nextNo)
          }}
          handleEditClick={(q) => formState.openEditModal(q)}
          handleDeleteClick={openDeleteModal}
        />
        
        <div className="px-4 md:px-6 pb-6">
          <SubmissionViewer />
        </div>
      </SidebarInset>

      <QuestionForm
        {...formState}
        handleSave={handleSave}
        saving={saving}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md border border-border shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <Trash2Icon className="size-5" />
              Delete Question?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1.5">
              Are you sure you want to delete this question? This action will soft-delete the question and options.
            </DialogDescription>
          </DialogHeader>

          {deletingQuestion && (
            <div className="my-3 p-3 bg-muted/30 border border-muted rounded-lg text-sm text-foreground">
              <span className="font-bold">Q {deletingQuestion.questionNo}: </span>
              {deletingQuestion.questionText}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={saving}>
              {saving ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
