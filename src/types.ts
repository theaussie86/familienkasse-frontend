export type Transaction = {
  _id: string;
  amount: number;
  created: string;
  description: string;
  account: "Spenden" | "Sparen" | "Investieren";
};
