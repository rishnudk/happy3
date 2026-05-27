export interface CurriculumPhase {
  phase: string;
  title: string;
  detail: string;
}

export interface ProgramItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  color: string;
  category: "Structured Courses" | "Therapeutic & Healing" | "One-to-One Coaching" | "Professional Certification";
  duration: string;
  format: string;
  objective: string;
  whoItIsFor: string;
  highlights: string[];
  curriculum: CurriculumPhase[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
