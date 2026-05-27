import { CommunityEvent, MarqueeImage } from "./types";

export const EVENTS: CommunityEvent[] = [
  {
    id: "breathwork-circle",
    title: "Mindfulness & Breathwork Circle",
    date: "June 05, 2026",
    time: "07:00 AM - 08:00 AM IST",
    format: "Online (Zoom)",
    category: "Meditation Circle",
    host: "Coach Ananya Sharma",
    desc: "Start your morning with guided deep somatic breathwork and active awareness exercises to center your nervous system."
  },
  {
    id: "science-resilience",
    title: "The Science of Emotional Resilience",
    date: "June 12, 2026",
    time: "06:30 PM - 08:00 PM IST",
    format: "Online Webinar",
    category: "Webinars",
    host: "Dr. Kabir Mehta (Positive Psychologist)",
    desc: "An evidence-based masterclass exploring neuroplasticity, cortisol reduction, and actionable habits to build a positive mental schema."
  },
  {
    id: "somatic-healing",
    title: "Somatic Healing & Resonance Meetup",
    date: "June 20, 2026",
    time: "04:00 PM - 07:00 PM IST",
    format: "Offline (HCA Centre, Bangalore)",
    category: "Meetups",
    host: "Master Sound Healer Rahul Sen",
    desc: "Experience acoustic soundscapes, somatic release movements, and face-to-face deep sharing circles in a safe physical space."
  },
  {
    id: "open-house",
    title: "Happiness Life Coach Certification Open House",
    date: "June 27, 2026",
    time: "11:00 AM - 12:30 PM IST",
    format: "Online Interactive Panel",
    category: "Workshops",
    host: "Academy Director & Senior Cohort Leads",
    desc: "Learn about India's first university life-coaching credentials. Ask questions about modules, pricing, practicums, and career paths."
  }
];

export const EVENT_CATEGORIES = [
  "All Events",
  "Workshops",
  "Meditation Circle",
  "Webinars",
  "Meetups"
] as const;

export const COMMUNITY_IMAGES: MarqueeImage[] = [
  { id: "1",  img: "/community/IMG-20260512-WA0030.jpg" },
  { id: "2",  img: "/community/IMG-20260512-WA0031.jpg" },
  { id: "3",  img: "/community/IMG-20260512-WA0046.jpg" },
  { id: "4",  img: "/community/IMG-20260512-WA0048.jpg" },
  { id: "5",  img: "/community/IMG-20260512-WA0052.jpg" },
  { id: "6",  img: "/community/IMG-20260512-WA0053.jpg" },
  { id: "7",  img: "/community/IMG-20260512-WA0054.jpg" },
  { id: "8",  img: "/community/IMG-20260512-WA0059.jpg" },
  { id: "9",  img: "/community/IMG-20260512-WA0061.jpg" },
  { id: "10", img: "/community/IMG-20260512-WA0063.jpg" },
  { id: "11", img: "/community/IMG-20260512-WA0064.jpg" },
  { id: "12", img: "/community/IMG-20260512-WA0067.jpg" },
  { id: "13", img: "/community/IMG-20260517-WA0043.jpg" },
  { id: "14", img: "/community/IMG-20260517-WA0044.jpg" },
  { id: "15", img: "/community/IMG-20260517-WA0046.jpg" },
];
