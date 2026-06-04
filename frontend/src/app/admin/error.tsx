"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-6 w-full h-full min-h-[500px]">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="size-6 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold">Admin Panel Error</h2>
        <p className="text-muted-foreground text-sm">
          There was a problem loading this section of the admin panel.
        </p>
        <div className="pt-4">
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
