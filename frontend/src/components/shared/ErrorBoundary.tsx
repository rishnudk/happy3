"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <Card className="w-full max-w-md border-destructive/20 bg-destructive/5">
            <CardHeader className="text-center">
              <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                <AlertCircle className="size-8 text-destructive" />
              </div>
              <CardTitle className="text-destructive">Something went wrong</CardTitle>
              <CardDescription>
                We encountered an unexpected error while loading this section.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm bg-background p-3 rounded-md overflow-auto max-h-32 text-muted-foreground font-mono">
                {this.state.error?.message || "Unknown error"}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => this.setState({ hasError: false })} variant="outline">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
