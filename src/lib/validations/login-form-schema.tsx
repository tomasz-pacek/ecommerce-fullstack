import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one digit")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
});
