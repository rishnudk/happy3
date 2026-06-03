"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateOptions,
} from "@/lib/api/assessment"
import type { Question, Option } from "@/types/assessment"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  PlusIcon,
  Trash2Icon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  ClipboardListIcon,
  SearchIcon,
  XIcon,
  AwardIcon,
  BookOpenIcon,
  SparklesIcon,
  FilterIcon,
  InfoIcon,
} from "lucide-react"
import { toast } from "sonner"

export default function AdminAssessmentPage() {
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  // Expand/collapse state for question options
  const [expandedQuestions, setExpandedQuestions] = React.useState<Record<number, boolean>>({})

  // Filter & Search states
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  // Modal states for Add/Edit
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingQuestion, setEditingQuestion] = React.useState<Question | null>(null)

  // Form states
  const [formQuestionNo, setFormQuestionNo] = React.useState<number>(1)
  const [formCategory, setFormCategory] = React.useState("")
  const [formQuestionText, setFormQuestionText] = React.useState("")
  const [formOptions, setFormOptions] = React.useState<{ optionText: string; mark: number }[]>([])

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [deletingQuestion, setDeletingQuestion] = React.useState<Question | null>(null)

  // Load questions on mount
  const loadQuestions = React.useCallback(async () => {
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

  React.useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  // Toggle options visibility
  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Open modal for Adding
  const handleAddClick = () => {
    setEditingQuestion(null)
    const nextNo = questions.length > 0 ? Math.max(...questions.map((q) => q.questionNo)) + 1 : 1
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

  // Open modal for Editing
  const handleEditClick = (q: Question) => {
    setEditingQuestion(q)
    setFormQuestionNo(q.questionNo)
    setFormCategory(q.category)
    setFormQuestionText(q.questionText)
    // Deep copy options
    setFormOptions(q.options.map((opt) => ({ optionText: opt.optionText, mark: opt.mark })))
    setIsModalOpen(true)
  }

  // Open delete confirmation modal
  const handleDeleteClick = (q: Question) => {
    setDeletingQuestion(q)
    setIsDeleteOpen(true)
  }

  // Handle option fields modification
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

  // Save Add/Edit Question
  const handleSaveQuestion = async (e: React.FormEvent) => {
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

    setSaving(true)
    try {
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

      if (editingQuestion) {
        // Edit mode: Update details first, then options
        await updateQuestion(editingQuestion.id, questionPayload)
        await updateOptions(editingQuestion.id, optionsPayload)
        toast.success("Question and options updated successfully")
      } else {
        // Add mode: Single endpoint creates both
        await createQuestion({
          ...questionPayload,
          options: optionsPayload.options,
        })
        toast.success("Question created successfully")
      }

      setIsModalOpen(false)
      loadQuestions()
    } catch (error: any) {
      console.error("Save question error:", error)
      toast.error(error.message || "Failed to save question")
    } finally {
      setSaving(false)
    }
  }

  // Delete Question
  const handleConfirmDelete = async () => {
    if (!deletingQuestion) return

    try {
      setSaving(true)
      await deleteQuestion(deletingQuestion.id)
      toast.success("Question deleted successfully")
      setIsDeleteOpen(false)
      setDeletingQuestion(null)
      loadQuestions()
    } catch (error: any) {
      console.error("Delete question error:", error)
      toast.error(error.message || "Failed to delete question")
    } finally {
      setSaving(false)
    }
  }

  // Get distinct categories
  const categories = React.useMemo(() => {
    const cats = new Set(questions.map((q) => q.category))
    return ["All", ...Array.from(cats)]
  }, [questions])

  // Filtered Questions
  const filteredQuestions = React.useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.questionNo.toString() === searchQuery
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [questions, searchQuery, selectedCategory])

  // Calculate Stats
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
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 bg-background/50">
          
          {/* Header Stats Bar */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border-l-4 border-l-purple-600 bg-card/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-4 px-6">
                <div className="rounded-lg bg-purple-500/10 p-3 text-purple-600 dark:text-purple-400">
                  <ClipboardListIcon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Questions</p>
                  <h3 className="text-2xl font-bold mt-0.5">{stats.total}</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-card/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-4 px-6">
                <div className="rounded-lg bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400">
                  <BookOpenIcon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</p>
                  <h3 className="text-2xl font-bold mt-0.5">{stats.catsCount}</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-teal-500 bg-card/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-4 px-6">
                <div className="rounded-lg bg-teal-500/10 p-3 text-teal-600 dark:text-teal-400">
                  <AwardIcon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Max Points</p>
                  <h3 className="text-2xl font-bold mt-0.5">{stats.totalMaxMarks}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search, Filter and Actions Toolbar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card/40 border p-4 rounded-xl backdrop-blur-xs">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search question text or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 border-muted focus-visible:ring-purple-500"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mr-1">
                <FilterIcon className="size-3.5" />
                Filter:
              </div>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className={`h-8 rounded-full text-xs font-medium ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleAddClick}
                className="ml-auto md:ml-2 h-9 bg-purple-600 text-white hover:bg-purple-700 font-semibold gap-1.5 shadow-sm shadow-purple-600/20"
              >
                <PlusIcon className="size-4" />
                Add Question
              </Button>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card/40">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-12 rounded-full" />
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Skeleton className="h-5 w-full mb-3" />
                    <Skeleton className="h-5 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card/10">
              <ClipboardListIcon className="size-12 text-muted-foreground/40 mb-3" />
              <h3 className="text-lg font-semibold text-foreground">No questions found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Try adjusting your search query, selecting another category, or add a new question to get started.
              </p>
              <Button onClick={handleAddClick} className="mt-4 bg-purple-600 text-white hover:bg-purple-700">
                Create First Question
              </Button>
            </div>
          ) : (
            /* Questions List */
            <div className="flex flex-col gap-4">
              {filteredQuestions.map((q) => {
                const isExpanded = !!expandedQuestions[q.id]
                return (
                  <Card
                    key={q.id}
                    className="group border border-border/80 bg-card/30 backdrop-blur-xs transition-all duration-300 hover:border-purple-500/40 hover:shadow-xs"
                  >
                    <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2 px-6 pt-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                          Q {q.questionNo}
                        </span>
                        <Badge variant="outline" className="bg-background/80 text-muted-foreground text-2xs uppercase tracking-wider font-semibold border-muted">
                          {q.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-md"
                          onClick={() => handleEditClick(q)}
                          title="Edit Question"
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-md"
                          onClick={() => handleDeleteClick(q)}
                          title="Delete Question"
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-5">
                      <h4 className="text-base font-medium text-foreground leading-relaxed">
                        {q.questionText}
                      </h4>

                      {/* Expandable Options Indicator */}
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors focus:outline-none"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUpIcon className="size-3.5" />
                            Hide Options
                          </>
                        ) : (
                          <>
                            <ChevronDownIcon className="size-3.5" />
                            Show Options ({q.options?.length || 0})
                          </>
                        )}
                      </button>

                      {/* Options List */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="grid gap-2">
                            {q.options && q.options.length > 0 ? (
                              q.options.map((opt, optIdx) => (
                                <div
                                  key={opt.id}
                                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background/40 border border-muted hover:bg-background/60 transition-colors"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="flex items-center justify-center size-5 text-2xs font-bold rounded-full bg-muted text-muted-foreground uppercase">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">{opt.optionText}</span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`text-2xs font-semibold ${
                                      opt.mark > 0
                                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                                        : "bg-muted/60 text-muted-foreground border-muted"
                                    }`}
                                  >
                                    +{opt.mark} pts
                                  </Badge>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground italic flex items-center gap-1.5 py-2">
                                <InfoIcon className="size-3.5" />
                                No options defined for this question.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </SidebarInset>

      {/* Add / Edit Question Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border border-border shadow-xl">
          <form onSubmit={handleSaveQuestion}>
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
              {/* Question Number and Category Row */}
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

              {/* Question Text */}
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

              {/* Options Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <Label className="text-sm font-bold text-foreground">Options & Marks</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOptionRow}
                    className="h-8 text-xs font-semibold gap-1 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/40 border-purple-500/20"
                  >
                    <PlusIcon className="size-3" />
                    Add Option
                  </Button>
                </div>

                <div className="grid gap-3">
                  {formOptions.map((opt, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/20 p-2 rounded-lg border border-dashed border-muted">
                      <span className="flex items-center justify-center size-6 text-xs font-bold rounded-full bg-muted text-muted-foreground uppercase shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <Input
                        placeholder={`Option ${String.fromCharCode(65 + index)} text`}
                        value={opt.optionText}
                        onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
                        required
                        className="flex-1 bg-background border-muted h-9 focus-visible:ring-purple-500"
                      />
                      <div className="w-24 shrink-0">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Mark"
                          value={opt.mark}
                          onChange={(e) => handleOptionChange(index, "mark", e.target.value)}
                          required
                          className="bg-background border-muted h-9 focus-visible:ring-purple-500 text-center"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOptionRow(index)}
                        disabled={formOptions.length <= 1}
                        className="h-9 w-9 text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md border border-border shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <Trash2Icon className="size-5" />
              Delete Question?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1.5">
              Are you sure you want to delete this question? This action will soft-delete the question and options, meaning they will not show up in the assessment anymore.
            </DialogDescription>
          </DialogHeader>

          {deletingQuestion && (
            <div className="my-3 p-3 bg-muted/30 border border-muted rounded-lg text-sm text-foreground">
              <span className="font-bold">Q {deletingQuestion.questionNo}: </span>
              {deletingQuestion.questionText}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteOpen(false)
                setDeletingQuestion(null)
              }}
              className="h-10 text-sm font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={saving}
              className="h-10 text-sm font-semibold min-w-24 shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
