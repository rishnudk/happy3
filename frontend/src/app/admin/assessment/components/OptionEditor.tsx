import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon, Trash2Icon } from "lucide-react"

interface OptionEditorProps {
  formOptions: { optionText: string; mark: number }[]
  handleOptionChange: (index: number, field: "optionText" | "mark", value: any) => void
  addOptionRow: () => void
  removeOptionRow: (index: number) => void
}

export function OptionEditor({ formOptions, handleOptionChange, addOptionRow, removeOptionRow }: OptionEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-1.5">
        <Label className="text-sm font-bold text-foreground">Options & Marks</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addOptionRow}
          className="h-8 text-xs font-semibold gap-1 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/40 border-purple-500/20"
        >
          <PlusIcon className="size-3" />
          Add Option
        </Button>
      </div>

      <div className="grid gap-3">
        {formOptions.map((opt, index) => (
          <div key={index} className="flex items-center gap-3 bg-muted/20 p-2 rounded-lg border border-dashed border-muted">
            <span className="flex items-center justify-center size-6 text-xs font-bold rounded-full bg-muted text-muted-foreground uppercase shrink-0">
              {String.fromCharCode(65 + index)}
            </span>
            <Input
              placeholder={`Option ${String.fromCharCode(65 + index)} text`}
              value={opt.optionText}
              onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
              required
              className="flex-1 bg-background border-muted h-9 focus-visible:ring-purple-500"
            />
            <div className="w-24 shrink-0">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Mark"
                value={opt.mark}
                onChange={(e) => handleOptionChange(index, "mark", e.target.value)}
                required
                className="bg-background border-muted h-9 focus-visible:ring-purple-500 text-center"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeOptionRow(index)}
              disabled={formOptions.length <= 1}
              className="h-9 w-9 text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
