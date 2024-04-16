import { z } from "zod";

export const createTransactionSchema = z.object({
  _id: z.string().optional(),
  description: z.string(),
  amount: z.coerce.number(),
  created: z.coerce.date().optional(),
  account: z.enum(["Sparen", "Spenden", "Investieren"]),
  isPaid: z.boolean().optional(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
