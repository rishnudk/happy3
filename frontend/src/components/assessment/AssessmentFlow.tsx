"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { JourneyPill } from "@/components/ui/JourneyPill";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          <JourneyPill
            href="/"
            icon={<ArrowLeft className="size-3.5 text-primary" strokeWidth={2.5} />}
          >
            Back to home
          </JourneyPill>
        </CardContent>
      </Card>
    );
  }

  if (step === "done") {
    return (
      <div className="mx-auto w-full mt-10 space-y-6">
        <NeuCard className="p-8 md:p-12 w-full flex flex-col items-center justify-center text-center" hoverLift={false}>
          <CheckCircle2 className="mb-6 size-16" style={{ color: "#800080" }} />
          <h2 className="font-satoshi text-3xl font-bold mb-4" style={{ color: "#2A254B" }}>
            Thank you!
          </h2>
          <p className="text-muted-foreground mb-4 text-base max-w-md">
            Your transformation journey assessment has been submitted successfully.
          </p>
          <p className="text-2xl font-bold mb-8" style={{ color: "#800080" }}>
            Your score: {totalScore}
          </p>
          <JourneyPill
            href="/"
            icon={<ArrowLeft className="size-3.5" strokeWidth={2.5} />}
          >
            Return to home
          </JourneyPill>
        </NeuCard>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="mx-auto w-full mt-10 space-y-6">
        <NeuCard className="p-8 md:p-12 w-full flex flex-col justify-between" hoverLift={false}>
          <div>
            <div className="text-center mb-8">
              <h2 className="font-satoshi text-2xl font-bold mb-2" style={{ color: "#2A254B" }}>
                Almost done — tell us about you
              </h2>
              <p className="text-sm text-muted-foreground">
                You answered all {questions.length} questions. Share your details to complete your assessment.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-satoshi font-semibold" style={{ color: "#2A254B" }}>
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailId" className="font-satoshi font-semibold" style={{ color: "#2A254B" }}>
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="you@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="font-satoshi font-semibold" style={{ color: "#2A254B" }}>
                  Phone number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl shadow-md text-white font-satoshi font-bold mt-4"
                disabled={submitting}
                style={{ background: "#800080" }}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </NeuCard>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full mt-10 space-y-6">
      <NeuCard className="p-8 md:p-12 w-full flex flex-col justify-between" hoverLift={false}>
        <div>
          {/* Question progress line — inside the card */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center justify-between text-sm">
              <span
                className="font-satoshi font-semibold"
                style={{ color: "#800080" }}
              >
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span
                className="font-satoshi font-medium text-xs"
                style={{ color: "#4A4568" }}
              >
                {progress}%
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full"
              style={{
                background: "#F6F3FA",
                boxShadow: "inset 2px 2px 5px #DDDAE3, inset -2px -2px 5px #FFFFFF",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #800080, #C084FC)",
                }}
              />
            </div>
          </div>

          {/* Category badge and question text */}
          <div className="flex flex-col items-center gap-4 pb-6">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase"
              style={{
                color: "rgba(128,0,128,0.75)",
                background: "#F6F3FA",
                boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
              }}
            >
              {currentQuestion?.category}
            </span>
            <h2
              className="font-satoshi font-bold text-xl leading-snug md:text-2xl text-center mt-2 px-2"
              style={{ color: "#2A254B" }}
            >
              {currentQuestion?.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 pt-4 max-w-2xl mx-auto">
            {currentQuestion?.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={selectedOptionId !== null && !isSelected}
                  onClick={() => handleSelectOption(option)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left transition-all",
                    isSelected
                      ? "shadow-sm"
                      : "hover:scale-[1.01]",
                    selectedOptionId !== null &&
                      !isSelected &&
                      "opacity-50 pointer-events-none"
                  )}
                  style={
                    isSelected
                      ? {
                          background: "rgba(128,0,128,0.08)",
                          boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
                        }
                      : {
                          background: "#F6F3FA",
                          boxShadow: "4px 4px 8px #DDDAE3, -4px -4px 8px #FFFFFF",
                        }
                  }
                >
                  <span
                    className="font-satoshi font-medium text-base md:text-lg"
                    style={{ color: "#4A4568" }}
                  >
                    {option.optionText}
                  </span>
                  {isSelected && (
                    <ChevronRight className="size-5 shrink-0" style={{ color: "#800080" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-sm font-satoshi mt-8" style={{ color: "#4A4568" }}>
          Tap an option to continue to the next question
        </p>
      </NeuCard>
    </div>
  );
}
