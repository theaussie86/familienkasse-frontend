export type Transaction = {
  _id: string;
  amount: number;
  created: Date;
  description: string;
  account: "Spenden" | "Sparen" | "Investieren";
};
