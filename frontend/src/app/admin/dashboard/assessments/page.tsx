"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  Calendar,
  Mail,
  Phone,
  User,
  Activity,
  Award,
  BookOpen,
  Sparkles
} from "lucide-react";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import NeuCard from "@/components/ui/NeuCard";

type Option = {
  id: number;
  optionText: string;
  mark: number;
};

type Question = {
  id: number;
  questionNo: number;
  category: string;
  questionText: string;
  options: Option[];
};

type SubmittedAnswer = {
  questionId: number;
  optionId: number;
  mark: number;
};

type Submission = {
  id: number;
  name: string;
  emailId: string;
  phoneNumber: string;
  totalScore: number;
  answers: SubmittedAnswer[];
  createdAt: string;
};

export default function AssessmentsDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch submissions
      const subRes = await fetch(`${API_BASE}/api/assessment/submissions`, {
        credentials: "include"
      });
      const subJson = await subRes.json();
      
      // Fetch questions
      const qRes = await fetch(`${API_BASE}/api/questions/getAllQuestions`, {
        credentials: "include"
      });
      const qJson = await qRes.json();

      if (subJson.success && qJson.success) {
        setSubmissions(subJson.data ?? []);
        setQuestions(qJson.data ?? []);
      } else {
        toast.error("Failed to load assessments data");
      }
    } catch {
      toast.error("Failed to load assessments data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Helper to get score badge styling
  const getScoreBadgeProps = (score: number) => {
    if (score >= 31) {
      return {
        label: "Flourishing",
        style: "bg-emerald-50 text-emerald-700 border-emerald-200/60"
      };
    } else if (score >= 21) {
      return {
        label: "Balanced",
        style: "bg-purple-50 text-purple-700 border-purple-200/60"
      };
    } else {
      return {
        label: "Reflective",
        style: "bg-amber-50 text-amber-700 border-amber-200/60"
      };
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            User Assessments
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
            <span className="font-medium text-primary">Assessments</span>
          </nav>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Submissions List */}
        <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)] lg:col-span-1">
          <CardHeader className="border-b border-border/30 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <ClipboardList className="size-4 text-primary" />
              Submissions List
            </CardTitle>
            <CardDescription>
              All submitted happiness survey assessments ({submissions.length})
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-12 text-center text-muted-foreground font-medium text-sm">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground font-medium text-sm">
                No submissions found.
              </div>
            ) : (
              <div className="divide-y divide-border/20 max-h-[600px] overflow-y-auto">
                {submissions.map((sub) => {
                  const badge = getScoreBadgeProps(sub.totalScore);
                  const isSelected = selectedSubmission?.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={cn(
                        "w-full text-left p-4.5 transition-colors flex flex-col gap-2 hover:bg-muted/30 cursor-pointer",
                        isSelected && "bg-primary/5 border-l-4 border-l-primary"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-sans font-bold text-nature-black/90 text-sm md:text-base leading-tight">
                          {sub.name}
                        </span>
                        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border", badge.style)}>
                          {sub.totalScore} pts
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="size-3.5" />
                        <span className="truncate">{sub.emailId}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{formatDate(sub.createdAt)}</span>
                        </div>
                        <span className="font-semibold text-primary text-[10px] uppercase tracking-wider">
                          {badge.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Submission Details */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="space-y-6">
              {/* Client Info Card */}
              <NeuCard variant="glass" className="p-6 md:p-8 w-full overflow-hidden" hoverLift={false}>
                <div className="relative z-10 space-y-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <User className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-xl text-nature-black/90 leading-tight">
                          {selectedSubmission.name}
                        </h3>
                        <p className="text-xs text-muted-foreground/80 font-display mt-0.5">
                          Submitted on {formatDate(selectedSubmission.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-border/30 shadow-sm self-start sm:self-auto">
                      <Award className="size-4 text-primary animate-pulse" />
                      <span className="text-xs font-display font-bold text-muted-foreground uppercase">Score:</span>
                      <span className="font-display font-black text-lg text-primary">{selectedSubmission.totalScore} / 40</span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-sm text-foreground/80 font-display">
                    <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl border border-white/60">
                      <Mail className="size-4 text-primary shrink-0" />
                      <span className="truncate">{selectedSubmission.emailId}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/40 px-3 py-2 rounded-xl border border-white/60">
                      <Phone className="size-4 text-primary shrink-0" />
                      <span>{selectedSubmission.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </NeuCard>

              {/* Reflection Flow Details */}
              <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
                <CardHeader className="border-b border-border/30 pb-4">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <BookOpen className="size-4 text-primary" />
                    Response Breakdown
                  </CardTitle>
                  <CardDescription>
                    Detailed view of each answer and associated marks
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-6">
                  {selectedSubmission.answers.map((ans, idx) => {
                    const matchedQuestion = questions.find((q) => q.id === ans.questionId);
                    const matchedOption = matchedQuestion?.options.find((o) => o.id === ans.optionId);
                    
                    return (
                      <div
                        key={ans.questionId}
                        className="p-5 rounded-2xl border border-border/20 space-y-3 bg-[#F6F3FA]/40 hover:bg-[#F6F3FA]/70 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-2.5">
                            <span className="size-5 rounded-md bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center mt-0.5 shrink-0">
                              {idx + 1}
                            </span>
                            <h4 className="font-display font-extrabold text-sm md:text-base text-nature-black/90 leading-tight">
                              {matchedQuestion?.questionText ?? `Question ID: ${ans.questionId}`}
                            </h4>
                          </div>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border bg-white"
                            style={{
                              color: ans.mark >= 3 ? "#800080" : "#6B6880",
                              borderColor: ans.mark >= 3 ? "rgba(128,0,128,0.2)" : "rgba(0,0,0,0.06)",
                            }}
                          >
                            <Activity className="size-3" />
                            {ans.mark} mark{ans.mark !== 1 && "s"}
                          </span>
                        </div>

                        <div
                          className="rounded-xl px-4 py-3 text-sm font-display flex items-center justify-between border border-[#FFCE1B]/20 bg-[#FFCE1B]/5"
                        >
                          <span className="text-foreground/90 font-medium leading-relaxed">
                            {matchedOption?.optionText ?? `Option ID: ${ans.optionId}`}
                          </span>
                          <span className="size-5 rounded-full bg-[#FFCE1B]/20 text-[#D4990A] flex items-center justify-center shrink-0">
                            <Sparkles className="size-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/40 rounded-3xl min-h-[400px] bg-white/30 backdrop-blur-sm">
              <ClipboardList className="size-12 text-muted-foreground/60 mb-4 animate-float" />
              <h3 className="font-display font-black text-lg text-nature-black/80">
                No Reflection Selected
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Select an assessment submission from the list on the left to inspect their detailed wellness results and chosen options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
