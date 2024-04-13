import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "../../types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { formatCurrency } from "../../util";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends Transaction> {
    deleteTransaction: (_id: string) => void;
    updateTransaction: (_id: string, data: Partial<Transaction>) => void;
  }
}

const columnHelper = createColumnHelper<Transaction>();

export const tableColumns = [
  columnHelper.accessor("created", {
    cell: (cell) =>
      new Intl.DateTimeFormat("de-DE", {
        dateStyle: "medium",
        timeZone: "Europe/Berlin",
      }).format(new Date(cell.getValue())),
    header: "Datum",
  }),
  columnHelper.accessor("description", {
    cell: ({ getValue, row, table }) => {
      const initialValue = getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        if (value !== initialValue) {
          table.options.meta?.updateTransaction(row.original._id, {
            description: value,
          });
        }
      };
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
    header: "Beschreibung",
  }),
  columnHelper.accessor("amount", {
    cell: ({ getValue, row, table }) => {
      const initialValue = getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue / 100);

      const onBlur = () => {
        if (value !== initialValue) {
          table.options.meta?.updateTransaction(row.original._id, {
            amount: value * 100,
          });
        }
      };
      return (
        <Input
          startAdornment="€"
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          onBlur={onBlur}
        />
      );
    },
    header: "Betrag",
  }),
  columnHelper.accessor("account", {
    cell: (cell) => cell.getValue(),
    header: "Konto",
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ table, row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <TrashIcon className="h-6 w-6 text-gray-500" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaktion löschen</DialogTitle>
              <DialogDescription>
                Willst du diese Transaktion wirklich löschen? Diese Aktion kann
                nicht rückgängig gemacht werden.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="default"
                onClick={() => {
                  table.options.meta?.deleteTransaction(row.original._id);
                }}
              >
                Löschen
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="sm">
                  Abbrechen
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  }),
];
