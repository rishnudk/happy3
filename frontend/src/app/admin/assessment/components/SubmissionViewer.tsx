import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function SubmissionViewer() {
  return (
    <Card className="bg-card/40 border-muted mt-6">
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Submission viewing is not yet implemented.</p>
      </CardContent>
    </Card>
  )
}
