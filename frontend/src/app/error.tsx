"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <Button onClick={() => reset()} className="w-full">
          Try again
        </Button>
      </div>
    </div>
  );
}
