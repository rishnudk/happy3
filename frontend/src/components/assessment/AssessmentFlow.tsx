"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

type Answer = {
  questionId: number;
  optionId: number;
  mark: number;
};

type Step = "questions" | "form" | "done";

export function AssessmentFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [step, setStep] = useState<Step>("questions");
  const [submitting, setSubmitting] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/questions/getAllQuestions`);
      const json = await res.json();
      if (json.success) {
        setQuestions(json.data ?? []);
      } else {
        toast.error("Could not load questions");
      }
    } catch {
      toast.error("Could not load questions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQuestion = questions[currentIndex];
  const progress =
    questions.length > 0
      ? Math.round(((currentIndex + 1) / questions.length) * 100)
      : 0;

  const goToNextQuestion = (answer: Answer) => {
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    setSelectedOptionId(null);

    if (currentIndex + 1 >= questions.length) {
      setStep("form");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleSelectOption = (option: Option) => {
    if (!currentQuestion || selectedOptionId !== null) return;

    setSelectedOptionId(option.id);

    const answer: Answer = {
      questionId: currentQuestion.id,
      optionId: option.id,
      mark: option.mark,
    };

    setTimeout(() => goToNextQuestion(answer), 350);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !emailId.trim() || !phoneNumber.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/assessment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          emailId: emailId.trim(),
          phoneNumber: phoneNumber.trim(),
          answers,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message ?? "Submission failed");
      }

      setTotalScore(json.data?.totalScore ?? 0);
      setStep("done");
      toast.success("Assessment submitted successfully");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to submit assessment";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground font-medium">Loading assessment...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="mx-auto max-w-lg border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-6">
            No questions are available yet. Please check back soon.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "done") {
    return (
      <Card className="mx-auto max-w-lg border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <CheckCircle2 className="mb-4 size-14 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Thank you!
          </h2>
          <p className="text-muted-foreground mb-2">
            Your transformation journey assessment has been submitted.
          </p>
          <p className="text-lg font-semibold text-primary mb-8">
            Your score: {totalScore}
          </p>
          <Button asChild className="rounded-xl">
            <Link href="/">Return to home</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "form") {
    return (
      <Card className="mx-auto max-w-lg border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="text-xl font-bold">
            Almost done — tell us about you
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            You answered all {questions.length} questions. Share your details to
            complete your assessment.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailId">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emailId"
                type="email"
                placeholder="you@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="h-10 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-10 rounded-lg"
                required
              />
            </div>
            <Button
              type="submit"
              className="h-11 w-full rounded-xl shadow-md shadow-primary/20"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardHeader className="border-b border-border/30 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary/80">
            {currentQuestion?.category}
          </span>
          <CardTitle className="text-lg font-bold leading-snug md:text-xl">
            {currentQuestion?.questionText}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-5">
          {currentQuestion?.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                disabled={selectedOptionId !== null && !isSelected}
                onClick={() => handleSelectOption(option)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border/50 bg-white hover:border-primary/40 hover:bg-primary/5",
                  selectedOptionId !== null &&
                    !isSelected &&
                    "opacity-50 pointer-events-none"
                )}
              >
                <span className="font-medium text-foreground">
                  {option.optionText}
                </span>
                {isSelected && (
                  <ChevronRight className="size-5 shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Tap an option to continue to the next question
      </p>
    </div>
  );
}
