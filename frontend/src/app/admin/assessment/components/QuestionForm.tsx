import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2Icon, SparklesIcon } from "lucide-react"
import { OptionEditor } from "./OptionEditor"
import { toast } from "sonner"
import type { Question } from "@/types/assessment"

interface QuestionFormProps {
  isModalOpen: boolean
  closeFormModal: () => void
  editingQuestion: Question | null
  formQuestionNo: number
  setFormQuestionNo: (val: number) => void
  formCategory: string
  setFormCategory: (val: string) => void
  formQuestionText: string
  setFormQuestionText: (val: string) => void
  formOptions: { optionText: string; mark: number }[]
  handleOptionChange: (index: number, field: "optionText" | "mark", value: any) => void
  addOptionRow: () => void
  removeOptionRow: (index: number) => void
  handleSave: (isEdit: boolean, id: number | null, questionPayload: any, optionsPayload: any) => Promise<void>
  saving: boolean
}

export function QuestionForm(props: QuestionFormProps) {
  const {
    isModalOpen,
    closeFormModal,
    editingQuestion,
    formQuestionNo,
    setFormQuestionNo,
    formCategory,
    setFormCategory,
    formQuestionText,
    setFormQuestionText,
    formOptions,
    handleSave,
    saving,
  } = props

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formQuestionText.trim()) {
      toast.error("Question text cannot be empty")
      return
    }
    if (!formCategory.trim()) {
      toast.error("Category cannot be empty")
      return
    }
    if (formOptions.length === 0) {
      toast.error("At least one option is required")
      return
    }
    for (let i = 0; i < formOptions.length; i++) {
      if (!formOptions[i].optionText.trim()) {
        toast.error(`Option ${i + 1} text cannot be empty`)
        return
      }
    }

    const questionPayload = {
      questionNo: Number(formQuestionNo),
      category: formCategory.trim(),
      questionText: formQuestionText.trim(),
    }

    const optionsPayload = {
      options: formOptions.map((opt) => ({
        optionText: opt.optionText.trim(),
        mark: Number(opt.mark),
      })),
    }

    try {
      await handleSave(!!editingQuestion, editingQuestion?.id || null, questionPayload, optionsPayload)
      closeFormModal()
    } catch (error) {
      // Error is handled in the hook
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={closeFormModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader className="pb-2 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <SparklesIcon className="size-5 text-purple-600" />
              {editingQuestion ? "Edit Question" : "Add New Question"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {editingQuestion
                ? "Modify the question details and its options below."
                : "Create a new question and assign points to its choices."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="questionNo" className="text-sm font-semibold text-foreground">
                  Question Number
                </Label>
                <Input
                  id="questionNo"
                  type="number"
                  min="1"
                  value={formQuestionNo}
                  onChange={(e) => setFormQuestionNo(Number(e.target.value))}
                  required
                  className="border-muted focus-visible:ring-purple-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className="text-sm font-semibold text-foreground">
                  Category
                </Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="e.g. Self-Awareness, Relationships"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  required
                  className="border-muted focus-visible:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="questionText" className="text-sm font-semibold text-foreground">
                Question Text
              </Label>
              <Textarea
                id="questionText"
                placeholder="Type the assessment question here..."
                value={formQuestionText}
                onChange={(e) => setFormQuestionText(e.target.value)}
                required
                rows={3}
                className="resize-none border-muted focus-visible:ring-purple-500"
              />
            </div>

            <OptionEditor
              formOptions={props.formOptions}
              handleOptionChange={props.handleOptionChange}
              addOptionRow={props.addOptionRow}
              removeOptionRow={props.removeOptionRow}
            />
          </div>

          <DialogFooter className="pt-4 border-t gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeFormModal}
              className="h-10 text-sm font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="h-10 text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 min-w-28 shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
