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
import { ColumnDef } from "@tanstack/react-table";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Transaction, any>[] = [
  {
    accessorKey: "created",
    cell: (cell) =>
      new Intl.DateTimeFormat("de-DE", {
        dateStyle: "medium",
        timeZone: "Europe/Berlin",
      }).format(new Date(cell.getValue())),
    header: "Datum",
  },
  {
    accessorKey: "description",
    cell: (cell) => cell.getValue(),
    header: "Beschreibung",
  },
  {
    accessorKey: "amount",
    cell: (cell) =>
      (cell.getValue() / 100).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      }),
    header: "Betrag",
  },
  {
    accessorKey: "account",
    cell: (cell) => cell.getValue(),
    header: "Konto",
  },
];

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
