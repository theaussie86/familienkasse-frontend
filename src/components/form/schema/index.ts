import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string(),
  amount: z.number(),
  created: z.date(),
  account: z.enum(["Sparen", "Spenden", "Investieren"]),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
