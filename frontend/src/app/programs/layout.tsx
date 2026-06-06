import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs | Happiness Coaching Academy",
  description:
    "Explore science-backed happiness coaching programs designed to build emotional resilience, mindfulness, and lasting well-being. Find the right path for your transformation.",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
