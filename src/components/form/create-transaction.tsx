import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { CreateTransactionSchema, createTransactionSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { cn } from "../../util";
import { Calendar } from "../ui/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../actions";
import { useAuth } from "../hooks/auth";
import { DialogClose } from "../ui/dialog";

function CreateTransactionForm() {
  const { idToken } = useAuth();
  const queryClient = useQueryClient();
  const addTransaction = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      created: new Date(),
      account: "Sparen",
    },
  });
  const options = ["Sparen", "Spenden", "Investieren"];
  function onSubmit(data: CreateTransactionSchema) {
    addTransaction.mutate({
      ...data,
      amount: Number(data.amount) * 100,
      idToken: idToken,
    });
  }
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betrag</FormLabel>
              <FormControl>
                <Input startAdornment={"€"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Konto</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="Sparen"
                  className="flex gap-x-2 space-y-1"
                >
                  {options.map((o) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={o} />
                      </FormControl>
                      <FormLabel className="font-normal">{o}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="created"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Datum auswählen</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Speichern</Button>
        </DialogClose>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}

export default CreateTransactionForm;
