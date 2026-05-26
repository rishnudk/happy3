"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, Smile, Compass, Heart } from "lucide-react";
import { JourneyPill } from "@/components/ui/JourneyPill";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NeuCard from "@/components/ui/NeuCard";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

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

type Step = "welcome" | "questions" | "form" | "done";

// Signature Brand Element - Thick geometric circular arcs with soft breathing animations
function VisualArcs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] z-0">
      {/* Patriarch Purple Arc - flowing diagonally bottom-left to upper-right */}
      <svg
        className="absolute -bottom-12 -left-12 w-80 h-80 text-[#800080] animate-pulse-slow"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 15,85 A 70,70 0 0,1 85,15"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>
      {/* Mustard Yellow Arc - overlapping slightly and pulsing */}
      <svg
        className="absolute -top-12 -right-12 w-64 h-64 text-[#FFCE1B] animate-pulse-slow"
        style={{ animationDelay: "2.5s" }}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 15,85 A 70,70 0 0,1 85,15"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function getResultDetails(score: number) {
  if (score >= 31) {
    return {
      title: "Flourishing Joy & Purpose",
      subtitle: "You practice happiness as an active, sustainable life skill.",
      description: "Your emotional foundation and sense of purpose are vibrant. You view setbacks through the lens of wisdom, lead relationships with deep presence, and actively cultivate gratitude. HCA can support you in elevating these daily habits, unlocking advanced emotional wisdom, and sharing your light to guide and empower others.",
      color: "#FFCE1B",
      bgStyle: "rgba(255,206,27,0.08)",
      textStyle: "#D4990A",
      icon: <Sparkles className="size-10 text-[#FFCE1B] animate-float" />,
      cardVariant: "mustard" as const,
    };
  } else if (score >= 21) {
    return {
      title: "Grounded Inner Balance",
      subtitle: "You possess a stable emotional foundation with beautiful room to expand.",
      description: "You demonstrate a strong, grounded emotional foundation. You recognize moments of joy and maintain baseline stability, but there are times when stress or daily busy-ness overrides your presence. Learning active, structured happiness skills will help you unlock even greater resilience, deeper relationships, and permanent inner calm.",
      color: "#800080",
      bgStyle: "rgba(128,0,128,0.06)",
      textStyle: "#800080",
      icon: <Compass className="size-10 text-[#800080] animate-float" />,
      cardVariant: "default" as const,
    };
  } else {
    return {
      title: "A Season of Soft Reflection",
      subtitle: "You are taking the first brave steps on your personal transformation journey.",
      description: "You are in a deeply reflective phase of self-discovery. Feeling overwhelmed or struggling to quiet future worries is highly natural—recognizing these habits is the first essential step toward growth. Happiness is not a lucky event; it is a skill. Your self-awareness today is the rich soil from which deep, sustainable inner balance will grow.",
      color: "#800080",
      bgStyle: "rgba(128,0,128,0.04)",
      textStyle: "#800080",
      icon: <Heart className="size-10 text-[#800080] animate-float" />,
      cardVariant: "glass" as const,
    };
  }
}

export function AssessmentFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [step, setStep] = useState<Step>("welcome");
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

    setTimeout(() => goToNextQuestion(answer), 400);
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <Smile className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-display font-medium">Preparing your transformation deck...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="mx-auto max-w-lg border-white/60 bg-white/90 shadow-[var(--shadow-card)]">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-6 font-display">
            No active transformation questions are uploaded yet. Check back soon!
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

  return (
    <div className="mx-auto w-full mt-6 space-y-6">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: WELCOME SCREEN */}
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <NeuCard variant="glass" className="p-8 md:p-14 w-full flex flex-col items-center text-center overflow-hidden" hoverLift={false}>
              <VisualArcs />
              
              <div className="relative z-10 max-w-2xl flex flex-col items-center">
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
                  style={{
                    color: "#800080",
                    background: "#F6F3FA",
                    boxShadow: "inset 3px 3px 7px #DDDAE3, inset -3px -3px 7px #FFFFFF",
                  }}
                >
                  <Sparkles className="size-3 text-primary animate-pulse" />
                  Self-Discovery Check-in
                </span>

                <h1 className="font-display text-3xl font-black tracking-tight text-foreground md:text-5xl leading-tight mb-5">
                  Discover Your Path to <span className="text-primary">Sustainable Joy</span>
                </h1>

                <p className="text-muted-foreground font-display text-base md:text-lg leading-relaxed mb-8 text-foreground/80">
                  At Happiness Coaching Academy, we teach happiness not as a fleeting emotion, but as a practical life skill that you can actively learn, practice, and share.
                  Take this 3-minute check-in to reflect on your daily habits and map your unique emotional foundation.
                </p>

                <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    onClick={() => setStep("questions")}
                    className="h-14 px-10 rounded-2xl text-base font-display font-bold text-[#111810] shadow-[0_10px_25px_rgba(255,206,27,0.35)] transition-all hover:scale-[1.03] active:scale-[0.98] border border-[#FFCE1B]/20 cursor-pointer"
                    style={{ background: "#FFCE1B" }}
                  >
                    Begin Reflection
                    <ChevronRight className="ml-2 size-5" />
                  </Button>
                  <span className="text-xs text-muted-foreground font-display">No right or wrong answers — just your honest awareness</span>
                </div>
              </div>
            </NeuCard>
          </motion.div>
        )}

        {/* STEP 2: QUESTIONS SLIDER */}
        {step === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <NeuCard className="p-6 md:p-12 w-full flex flex-col justify-between overflow-hidden" hoverLift={false}>
              <VisualArcs />
              
              <div className="relative z-10 w-full">
                {/* Question progress line */}
                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display font-extrabold text-primary">
                      JOURNEY NODE {currentIndex + 1} OF {questions.length}
                    </span>
                    <span className="font-display font-medium text-xs text-muted-foreground bg-white/60 px-3 py-1 rounded-full shadow-sm">
                      {progress}% complete
                    </span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full p-0.5"
                    style={{
                      background: "#F6F3FA",
                      boxShadow: "inset 2px 2px 5px #DDDAE3, inset -2px -2px 5px #FFFFFF",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #800080 0%, #FFCE1B 100%)",
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    {/* Category Badge & Question */}
                    <div className="flex flex-col items-center gap-4 pb-4">
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/5"
                        style={{
                          color: "#800080",
                          background: "#F6F3FA",
                          boxShadow: "inset 2px 2px 5px #DDDAE3, inset -2px -2px 5px #FFFFFF",
                        }}
                      >
                        {currentQuestion?.category}
                      </span>
                      <h2
                        className="font-display font-black text-2xl leading-tight md:text-3xl text-center mt-2 px-2 max-w-2xl"
                        style={{ color: "#2A254B" }}
                      >
                        {currentQuestion?.questionText}
                      </h2>
                    </div>

                    {/* Options list */}
                    <div className="space-y-4 pt-4 max-w-2xl mx-auto">
                      {currentQuestion?.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={selectedOptionId !== null}
                            onClick={() => handleSelectOption(option)}
                            className={cn(
                              "flex w-full items-center justify-between gap-5 rounded-2xl px-6 py-5 text-left transition-all border cursor-pointer",
                              isSelected
                                ? "shadow-[inset_2px_2px_5px_rgba(128,0,128,0.15)] border-primary/20 scale-[0.99]"
                                : "hover:scale-[1.015] active:scale-[0.995] border-white/60",
                              selectedOptionId !== null && !isSelected && "opacity-40"
                            )}
                            style={
                              isSelected
                                ? {
                                    background: "rgba(128,0,128,0.06)",
                                  }
                                : {
                                    background: "#F6F3FA",
                                    boxShadow: "4px 4px 9px #DDDAE3, -4px -4px 9px #FFFFFF",
                                  }
                            }
                          >
                            <span
                              className="font-display font-medium text-base md:text-lg text-foreground/90 leading-normal"
                            >
                              {option.optionText}
                            </span>
                            <span
                              className="size-6 rounded-full shrink-0 flex items-center justify-center transition-all border"
                              style={
                                isSelected
                                  ? { background: "#800080", borderColor: "#800080" }
                                  : { background: "#FFFFFF", borderColor: "#DDDAE3" }
                              }
                            >
                              {isSelected && <ChevronRight className="size-3.5 text-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-center text-xs font-display mt-8 text-muted-foreground/80 relative z-10">
                Choose the answer that feels most natural to you. Tap an option to continue.
              </p>
            </NeuCard>
          </motion.div>
        )}

        {/* STEP 3: DETAILS COLLECTION FORM */}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <NeuCard className="p-8 md:p-12 w-full flex flex-col justify-between overflow-hidden" hoverLift={false}>
              <VisualArcs />
              
              <div className="relative z-10 w-full">
                <div className="text-center mb-8 max-w-xl mx-auto">
                  <h2 className="font-display text-3xl font-black mb-3" style={{ color: "#2A254B" }}>
                    Reflection Complete
                  </h2>
                  <p className="text-sm font-display text-muted-foreground leading-relaxed">
                    You have finished all {questions.length} questions. Please share your details below to secure your personalized wellness profile and calculate your insights score.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-display font-extrabold text-xs tracking-wider uppercase" style={{ color: "#2A254B" }}>
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400 font-display px-4"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailId" className="font-display font-extrabold text-xs tracking-wider uppercase" style={{ color: "#2A254B" }}>
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="emailId"
                      type="email"
                      placeholder="name@example.com"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400 font-display px-4"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="font-display font-extrabold text-xs tracking-wider uppercase" style={{ color: "#2A254B" }}>
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="e.g., +1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12 rounded-xl bg-[#F6F3FA] border-none shadow-[inset_2px_2px_5px_#DDDAE3,inset_-2px_-2px_5px_#FFFFFF] focus-visible:ring-1 focus-visible:ring-purple-400 font-display px-4"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="h-13 w-full rounded-xl shadow-[0_6px_20px_rgba(128,0,128,0.25)] text-white font-display font-bold mt-4 transition-all hover:scale-[1.015] active:scale-[0.98] cursor-pointer"
                    disabled={submitting}
                    style={{ background: "#800080" }}
                  >
                    {submitting ? "Analyzing Your Reflection..." : "Unlock My Insights"}
                  </Button>
                </form>
              </div>
            </NeuCard>
          </motion.div>
        )}

        {/* STEP 4: WISE PERSONALIZED RESULTS SCREEN */}
        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {(() => {
              const resDetails = getResultDetails(totalScore);
              return (
                <div className="mx-auto w-full space-y-6">
                  <NeuCard variant={resDetails.cardVariant} className="p-8 md:p-14 w-full flex flex-col items-center overflow-hidden" hoverLift={false}>
                    <VisualArcs />
                    
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
                      {/* Interactive score badge with glowing circles */}
                      <div className="relative flex items-center justify-center mb-6">
                        <div
                          className="absolute inset-0 rounded-full blur-xl animate-pulse"
                          style={{ background: resDetails.color, opacity: 0.2 }}
                        />
                        <div
                          className="size-28 rounded-full flex flex-col items-center justify-center font-display border-4 shadow-lg bg-white/95"
                          style={{ borderColor: resDetails.color }}
                        >
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score</span>
                          <span className="text-3xl font-black" style={{ color: "#2A254B" }}>{totalScore}</span>
                          <span className="text-[10px] font-medium text-muted-foreground/80">out of 40</span>
                        </div>
                      </div>
                      
                      {/* Wise feedback details */}
                      <div className="mb-4">
                        {resDetails.icon}
                      </div>

                      <h2 className="font-display text-3xl font-black mb-2" style={{ color: "#2A254B" }}>
                        {resDetails.title}
                      </h2>
                      
                      <p className="font-display font-extrabold text-sm mb-6 max-w-lg leading-relaxed" style={{ color: resDetails.color }}>
                        {resDetails.subtitle}
                      </p>
                      
                      {/* Supportive insights summary box */}
                      <div
                        className="rounded-2xl p-6 md:p-8 text-left border border-white/60 mb-8 w-full"
                        style={{
                          background: "#F6F3FA",
                          boxShadow: "inset 4px 4px 8px #DDDAE3, inset -4px -4px 8px #FFFFFF",
                        }}
                      >
                        <h4 className="font-display font-black text-xs uppercase tracking-widest mb-3" style={{ color: "#800080" }}>
                          Your Custom Assessment Insight
                        </h4>
                        <p className="font-display text-sm md:text-base leading-relaxed text-foreground/80">
                          {resDetails.description}
                        </p>
                      </div>

                      {/* Next Step Call to Action */}
                      <div
                        className="rounded-2xl p-6 border border-primary/10 w-full mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 bg-white/60 backdrop-blur-sm"
                      >
                        <div>
                          <h5 className="font-display font-extrabold text-sm text-foreground">
                            Cultivate Happiness as a Sustainable Skill
                          </h5>
                          <p className="text-xs text-muted-foreground font-display mt-0.5">
                            Apply HCA's structure, wisdom, and emotional training in your life.
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="h-10 rounded-xl px-5 text-xs font-display font-bold text-white shadow-md cursor-pointer whitespace-nowrap"
                          onClick={() => window.open("/", "_self")}
                          style={{ background: "#800080" }}
                        >
                          Explore Programs
                        </Button>
                      </div>

                      <JourneyPill
                        href="/"
                        icon={<ArrowLeft className="size-3.5" strokeWidth={2.5} />}
                      >
                        Return to home
                      </JourneyPill>
                    </div>
                  </NeuCard>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
