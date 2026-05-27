import { ProgramItem, FAQItem } from "./types";

export const PROGRAMS: ProgramItem[] = [
  {
    id: "happiness-code",
    num: "01",
    title: "Happiness Code",
    desc: "15 powerful sessions to unlock the secrets of true happiness through emotional intelligence and brain chemistry.",
    color: "#800080", // Brand Purple
    category: "Structured Courses",
    duration: "6 Weeks (15 Sessions)",
    format: "Interactive Online Cohort & Self-Paced",
    objective: "To master emotional reframing, happiness habits, and cognitive resilience to overcome stress, anxiety, and daily friction.",
    whoItIsFor: "Individuals seeking a structured, science-backed approach to building happiness as a sustainable, daily practice.",
    highlights: [
      "15 guided micro-sessions",
      "Science-backed habit tracking",
      "Emotional resilience toolkits",
      "Lifetime community access"
    ],
    curriculum: [
      { phase: "Phase 1", title: "The Physiology of Joy", detail: "Learn the brain chemistry behind joy, cortisol reduction techniques, and neurotransmitter activation loops." },
      { phase: "Phase 2", title: "Cognitive Reframing", detail: "Identify cognitive distortions, silence negative self-talk, and build healthy mindset schemas." },
      { phase: "Phase 3", title: "Habit Engineering", detail: "Design daily micro-habits, set up structural progress logs, and identify emotional triggers." },
      { phase: "Phase 4", title: "Everyday Gratitude & Flow", detail: "Deep-dive techniques for permanent mindset transformation and staying in the zone of inner peace." }
    ]
  },
  {
    id: "awaken-mastery",
    num: "02",
    title: "Awaken Mastery Listening Centre",
    desc: "Deep inner emotional work and acoustic/somatic healing modalities for lasting peace and trauma release.",
    color: "#EC4899", // Fuchsia Rose
    category: "Therapeutic & Healing",
    duration: "8 Weeks (Deep Dive)",
    format: "Hybrid (Online Modules + In-person Resonance Sessions)",
    objective: "Achieve deep inner emotional healing, meditative mindfulness, and nervous system rebalancing through specialized resonance and somatic methods.",
    whoItIsFor: "Anyone recovering from deep emotional burnout, feeling stuck, or seeking profound mindfulness and a protective inner balance.",
    highlights: [
      "Acoustic resonance therapy",
      "Somatic somatic release work",
      "2-day silent meditation check-in",
      "Expert-led sound healing groups"
    ],
    curriculum: [
      { phase: "Phase 1", title: "Resonant Soundscapes", detail: "Acoustic resonance treatments designed to soothe the amygdala and calm the overactive central nervous system." },
      { phase: "Phase 2", title: "Emotional Somatics", detail: "Somatic release exercises designed to identify and unpack stored physical tension and trauma in the body." },
      { phase: "Phase 3", title: "Quiet Mindfulness & Breath", detail: "Integrating deep conscious breathwork and guided silent reflection to strengthen self-awareness." },
      { phase: "Phase 4", title: "Reintegration & Harmony", detail: "Creating personalized rituals to safeguard your peace and sustain high emotional energy in noisy environments." }
    ]
  },
  {
    id: "listening-centre",
    num: "03",
    title: "Listening Centre (online/ offline)",
    desc: "One-to-one personal clarity and active listening sessions with trained experts for targeted guidance.",
    color: "#7C3AED", // Deep Violet
    category: "One-to-One Coaching",
    duration: "Custom Session Packages",
    format: "One-to-One Private Sessions (Zoom or Face-to-Face)",
    objective: "Receive hyper-personalized guidance, therapeutic active listening, and customized strategic advice to untangle major career, relationship, or identity blockages.",
    whoItIsFor: "High-performers, leaders, or individuals looking for high-touch, strictly confidential, and tailored personal coaching rather than group sessions.",
    highlights: [
      "100% confidential safe space",
      "Tailored reflective roadmaps",
      "Flexible online/offline options",
      "Direct 1-on-1 expert pairing"
    ],
    curriculum: [
      { phase: "Step 1", title: "Active Decoupling", detail: "A completely non-judgmental space to download your current mental and emotional friction and mapping triggers." },
      { phase: "Step 2", title: "Core Conflict Discovery", detail: "Guided inquiry to uncover deep-seated identity or goal misalignment causing current blockages." },
      { phase: "Step 3", title: "Somatic Clarity Blueprint", detail: "Co-creating a concrete action plan, boundary rules, and cognitive tools to navigate the bottleneck." },
      { phase: "Step 4", title: "Supportive Integration", detail: "Weekly integration touchpoints to lock in progress, review hurdles, and adapt the strategy in real-time." }
    ]
  },
  {
    id: "coaching-certification",
    num: "04",
    title: "Happiness Coaching Certification",
    desc: "India's first university-accredited certification program to become a certified professional Happiness Life Coach.",
    color: "#FF9F1C", // Mustard Gold
    category: "Professional Certification",
    duration: "6 Months (Full Cohort)",
    format: "Weekly Live Interactive Classes + Practicum + Mentorship",
    objective: "Master the psychology research, pedagogical tools, coaching frameworks, and business modeling required to run a highly successful happiness coaching practice.",
    whoItIsFor: "Educators, HR managers, therapists, corporate leaders, or ambitious individuals looking to teach, consult, or practice coaching at the highest level.",
    highlights: [
      "University-accredited curriculum",
      "Supervised coaching practicums",
      "Business setup launchpad kit",
      "Prestige credentials and badges"
    ],
    curriculum: [
      { phase: "Phase 1", title: "Positive Psychology Core", detail: "Deep study of historical happiness models, positive psychology foundations, and the PERMA-V framework." },
      { phase: "Phase 2", title: "Coaching Pedagogy", detail: "Mastering active inquiry, structural listening, group facilitation, and course design." },
      { phase: "Phase 3", title: "Clinical Practicum & Mentorship", detail: "Executing supervised real-world coaching sessions, getting live feedback, and peer-to-peer exercises." },
      { phase: "Phase 4", title: "Business Launch & Scale", detail: "Setting up your corporate or individual practice, pricing, marketing strategies, and code of ethics." }
    ]
  }
];

export const CATEGORIES = [
  "All Paths",
  "Structured Courses",
  "Therapeutic & Healing",
  "One-to-One Coaching",
  "Professional Certification"
] as const;

export const FAQS: FAQItem[] = [
  {
    question: "Do I receive a certificate after completing these programs?",
    answer: "Yes! All structured programs (Happiness Code and Happiness Coaching Certification) provide official credentials. The Happiness Coaching Certification is India’s first university-certified program, offering professional accreditation that can be used globally in coaching, consulting, and corporate training."
  },
  {
    question: "What is the difference between the Listening Centre and standard coaching?",
    answer: "The Listening Centre is centered on therapeutic active listening and emotional somatic support. Rather than telling you what to do, our certified specialists create an exceptionally safe, non-judgmental container to help you untangle blockages, offering somatic and resonance tools that standard cognitive coaching often misses."
  },
  {
    question: "Can I take the programs completely online?",
    answer: "Absolutely. All programs have robust, interactive online pathways. Even the Awaken Mastery Listening Centre has fully online resonance modules, though we offer optional hybrid, offline somatic gatherings for individuals who want face-to-face healing work."
  },
  {
    question: "How do I know which program is correct for me?",
    answer: "We highly recommend starting with our signature 'Start Your Transformation' Assessment! It is a quick, science-backed diagnostic tool that maps your current emotional awareness and happiness levels. Based on your scores, it will recommend the exact path that fits your current needs. You can take the assessment by clicking any of the 'Start Transformation' buttons on this page."
  },
  {
    question: "Are there flexible payment options or scholarships available?",
    answer: "Yes, we support our community by providing flexible installment plans for the Happiness Coaching Certification and standard courses. We also offer select partial scholarships for educators, mental health advocates, and students. Please contact our support team to learn more."
  }
];
