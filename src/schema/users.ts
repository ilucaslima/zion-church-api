import { z } from "zod";

export const userSchemaValidation = z.object({
  email: z.string(),
  password: z.string().min(8),
});
