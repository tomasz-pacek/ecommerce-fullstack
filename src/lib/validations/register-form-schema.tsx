import * as z from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, "Your name must be at least 3 characters.")
    .max(32, "Your name can be at most 32 characters."),
  lastName: z
    .string()
    .min(3, "Your last name must be at least 3 characters.")
    .max(32, "Your last name can be at most 32 characters."),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one digit")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
});
