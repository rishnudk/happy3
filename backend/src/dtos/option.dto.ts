import { z } from "zod";

const OptionItemSchema = z.object({
  optionText: z.string().min(1, "Option text is required"),
  mark: z.number().int().min(0).max(10),
});

export const UpdateOptionsSchema = z.object({
  options: z.array(OptionItemSchema).min(1, "At least 1 option required"),
});

export type UpdateOptionsDTO = z.infer<typeof UpdateOptionsSchema>;
