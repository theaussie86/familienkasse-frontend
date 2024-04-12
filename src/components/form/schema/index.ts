import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string(),
  amount: z.coerce.number(),
  created: z.coerce.date(),
  account: z.enum(["Sparen", "Spenden", "Investieren"]),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
