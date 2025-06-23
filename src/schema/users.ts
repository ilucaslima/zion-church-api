import { z } from "zod";

export const userSchemaValidation = z.object({
  cpf: z.string(),
  password: z.string().min(8),
  name: z.string().optional(),
});
