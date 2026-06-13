import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { JourneyPill } from "@/components/ui/JourneyPill";

export const metadata: Metadata = {
  title: "Happiness Assessment | Happiness Coaching Academy",
  description:
    "Take our free, science-backed Happiness Assessment to evaluate your current well-being, mindfulness, and resilience. Get personalized insights for your coaching journey.",
};

export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-[#2A254B] text-white">

      {/* Ambient dark glow backdrop like Testimonials */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,128,0.2),transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <header className="relative mb-8 flex items-center justify-center min-h-[48px]">
          <div className="absolute left-0">
            <JourneyPill
              href="/"
              variant="dark"
              icon={<ArrowLeft className="size-3 sm:size-3.5 text-white" strokeWidth={2.5} />}
            >
              <span className="hidden sm:inline text-white">Back to home</span>
              <span className="inline sm:hidden text-white">Back</span>
            </JourneyPill>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logoH.png"
              alt="Happiness Coaching Academy"
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <div className="flex flex-col text-left leading-none font-satoshi font-bold">
              <span className="text-white uppercase tracking-wider text-[10px] md:text-[14px]">
                Happiness
              </span>
              <span className="text-[#FFCE1B] uppercase tracking-widest mt-0.5 text-[7px] md:text-[11px]">
                Coaching Academy
              </span>
            </div>
          </Link>
        </header>

        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-black tracking-tight text-white md:text-3xl">
            Start Your Transformation
          </h1>
          <p className="mt-2 text-sm text-white/70 md:text-base">
            Answer each question honestly. Your score reflects the options you choose.
          </p>
        </div>

        <AssessmentFlow />
      </div>
    </main>
  );
}
