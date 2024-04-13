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
import { CalendarIcon, Check, TrashIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
  CommandGroup,
} from "../ui/command";
import { cn } from "../../util";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

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
    cell: ({ getValue, row, table }) => {
      const initialValue = getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState(initialValue);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);

      const changeDate = (newDate: Date) => {
        table.options.meta?.updateTransaction(row.original._id, {
          created: newDate,
        });
      };
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: de })
              ) : (
                <span>Wähle ein Datum</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              locale={de}
              selected={date}
              onSelect={(d) => {
                if (d) {
                  setDate(d);
                  changeDate(d);
                }
                setOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    },
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
    cell: ({ getValue, row, table }) => {
      const initialValue = getValue();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);

      const onBlur = (currentValue: "Spenden" | "Sparen" | "Investieren") => {
        table.options.meta?.updateTransaction(row.original._id, {
          account: currentValue,
        });
      };

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value}
              <ChevronUpDownIcon className="h-6 w-6 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Wähle ein Konto..." />
              <CommandEmpty>Keine Kontos gefunden</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {["Sparen", "Spenden", "Investieren"].map((account) => (
                    <CommandItem
                      disabled={value === account}
                      key={account}
                      value={account}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue as "Sparen" | "Spenden" | "Investieren"
                        );
                        onBlur(
                          currentValue as "Sparen" | "Spenden" | "Investieren"
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === account ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {account}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
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
