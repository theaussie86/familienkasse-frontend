import { Transaction } from "./types";

export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const sumupAmounts = (acc: number, transaction: Transaction) =>
  acc + transaction.amount;

export const formatCurrency = (value: number | undefined) => {
  return (
    value &&
    (value / 100).toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    })
  );
};
