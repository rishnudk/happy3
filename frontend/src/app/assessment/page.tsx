import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { GlobalBackground } from "@/components/sections/GlobalBackground";

export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlobalBackground />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home/logo.svg"
              alt="Happiness Coaching Academy"
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span className="hidden font-bold text-primary sm:inline">
              HCA
            </span>
          </Link>
        </header>

        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-black tracking-tight text-foreground md:text-3xl">
            Start Your Transformation
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Answer each question honestly. Your score reflects the options you
            choose.
          </p>
        </div>

        <AssessmentFlow />
      </div>
    </main>
  );
}
