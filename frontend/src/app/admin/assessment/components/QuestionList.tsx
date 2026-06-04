import * as React from "react"
import type { Question } from "@/types/assessment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  PencilIcon,
  Trash2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardListIcon,
  SearchIcon,
  FilterIcon,
  InfoIcon,
  AwardIcon,
  BookOpenIcon,
  PlusIcon
} from "lucide-react"

interface QuestionListProps {
  questions: Question[]
  loading: boolean
  categories: string[]
  stats: { total: number; catsCount: number; totalMaxMarks: number }
  handleAddClick: () => void
  handleEditClick: (q: Question) => void
  handleDeleteClick: (q: Question) => void
}

export function QuestionList({
  questions,
  loading,
  categories,
  stats,
  handleAddClick,
  handleEditClick,
  handleDeleteClick,
}: QuestionListProps) {
  const [expandedQuestions, setExpandedQuestions] = React.useState<Record<number, boolean>>({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 bg-background/50">
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
  )
}
