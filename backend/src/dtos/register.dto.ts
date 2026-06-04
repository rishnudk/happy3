import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  name: z.string().min(1).max(100).optional(),
  emailId: z.string().email("Invalid email address").optional(),
  phoneNumber: z.string().min(5).max(20).optional(),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
