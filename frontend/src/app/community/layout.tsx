import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Happiness Coaching Academy",
  description:
    "Join the Happiness Coaching Academy community. Connect at live events, explore photo highlights, and join our WhatsApp group for daily support.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
