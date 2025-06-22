import { z } from "zod";

export const postSchemaValidation = z.object({
  content: z.string().min(3),
});
