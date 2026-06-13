"use client";

import React, { useEffect, useState, useMemo } from "react";
import { API_BASE } from "@/lib/api";
import NeuCard from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  id: number;
  optionText: string;
  mark: number;
  questionId: number;
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

const ScoreRing = ({ score, maxScore }: { score: number; maxScore: number }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  
  let color = "text-green-400";
  let strokeColor = "stroke-green-400";
  
  if (percentage < 40) {
    color = "text-red-400";
    strokeColor = "stroke-red-400";
  } else if (percentage < 70) {
    color = "text-yellow-400";
    strokeColor = "stroke-yellow-400";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative mx-auto flex size-40 items-center justify-center">
      <svg className="size-full -rotate-90 transform" viewBox="0 0 140 140">
        {/* Background ring */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-none stroke-white/10"
          strokeWidth="12"
        />
        {/* Progress ring */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          className={`fill-none ${strokeColor}`}
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-black ${color}`}>{score}</span>
        <span className="text-xs font-semibold text-white/70">out of {maxScore}</span>
      </div>
    </div>
  );
};

export function AssessmentFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [userDetails, setUserDetails] = useState({
    name: "",
    emailId: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ totalScore: number } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/questions`);
        if (!res.ok) throw new Error("Failed to fetch questions");
        const json = await res.json();
        setQuestions(json.data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const maxPossibleScore = useMemo(() => {
    return questions.reduce((sum, q) => {
      const maxMark = Math.max(0, ...q.options.map(o => o.mark));
      return sum + maxMark;
    }, 0);
  }, [questions]);

  const handleOptionSelect = (questionId: number, option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        optionId: option.id,
        mark: option.mark,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...userDetails,
      answers: Object.values(answers),
    };

    try {
      const res = await fetch(`${API_BASE}/api/assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Submission failed");
      }

      const json = await res.json();
      setResult(json.data);
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="size-10 animate-spin text-white" />
        <p className="animate-pulse font-medium text-white/80">Loading your assessment...</p>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border border-red-900 bg-red-950/50 p-8 text-center text-red-400">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-white underline hover:text-white/80">
          Try again
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full p-8 text-center text-white/70">
        No questions available at the moment.
      </div>
    );
  }

  // --- Success Screen ---
  if (result) {
    return (
      <NeuCard variant="dark-glass" className="mx-auto w-full max-w-xl p-8 text-center sm:p-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <Sparkles className="size-10" />
        </motion.div>
        <h2 className="mb-4 font-display text-3xl font-black text-white">
          Assessment Complete!
        </h2>
        <p className="mb-8 text-white/80">
          Thank you for taking the time to answer honestly. Your responses have been
          recorded, and an expert coach will reach out to you soon with personalized
          insights.
        </p>
        
        <div className="mb-8">
          <ScoreRing score={result.totalScore} maxScore={maxPossibleScore} />
        </div>

        <div>
          <NeuButton href="/" variant="dark-primary">
            Back to Home
          </NeuButton>
        </div>
      </NeuCard>
    );
  }

  const isLeadFormStep = currentStepIndex === questions.length;
  const currentQuestion = !isLeadFormStep ? questions[currentStepIndex] : null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8 px-2 sm:px-0">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-white/70">
          <span>
            {isLeadFormStep
              ? "Final Step"
              : `Question ${currentStepIndex + 1} of ${questions.length}`}
          </span>
          <span>{Math.round((currentStepIndex / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isLeadFormStep && currentQuestion ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <NeuCard variant="dark-glass" className="p-6 sm:p-8">
              <div className="text-center sm:text-left">
                <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  {currentQuestion.category}
                </span>
                <h2 className="mb-6 font-display text-2xl font-bold text-white">
                  {currentQuestion.questionText}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    answers[currentQuestion.id]?.optionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(currentQuestion.id, option)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/20 shadow-md"
                          : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                      }`}
                    >
                      <span className={`font-medium ${isSelected ? "text-white" : "text-white/80"}`}>
                        {option.optionText}
                      </span>
                      {isSelected && <CheckCircle2 className="size-5 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" />
                  Previous
                </button>

                <NeuButton
                  variant="dark-primary"
                  onClick={handleNext}
                  className={!answers[currentQuestion.id] ? "pointer-events-none opacity-50" : "w-full sm:w-auto"}
                >
                  Next
                  <ArrowRight className="size-4" />
                </NeuButton>
              </div>
            </NeuCard>
          </motion.div>
        ) : (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <NeuCard variant="dark-glass" className="p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="font-display text-2xl font-bold text-white">
                  Almost Done!
                </h2>
                <p className="mt-2 text-white/70">
                  Where should we send your personalized insights?
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-md bg-red-950/50 border border-red-900 p-3 text-sm text-red-400 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">Full Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Jane Doe"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailId" className="text-white/90">Email Address</Label>
                  <Input
                    id="emailId"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={userDetails.emailId}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, emailId: e.target.value })
                    }
                    className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white/90">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={userDetails.phoneNumber}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, phoneNumber: e.target.value })
                    }
                    className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-primary"
                  />
                </div>

                <div className="mt-8 flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white"
                  >
                    <ArrowLeft className="size-4" />
                    Back to questions
                  </button>

                  <NeuButton 
                    variant="dark-primary" 
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My Results
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </NeuButton>
                </div>
              </form>
            </NeuCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
