import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  BanknotesIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
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

export const baseStats = [
  {
    id: 1,
    name: "Sparen",
    icon: BanknotesIcon,
  },
  {
    id: 2,
    name: "Spenden",
    icon: GiftIcon,
  },
  {
    id: 3,
    name: "Investieren",
    icon: ChartBarIcon,
  },
];
