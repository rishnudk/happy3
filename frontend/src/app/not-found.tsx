import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <div className="space-y-4">
        <h1 className="text-8xl font-black text-primary/20">404</h1>
        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps never existed.
        </p>
        <div className="pt-6">
          <Link href="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
