import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionSchema, createTransactionSchema } from "./schema";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

function CreateTransactionForm() {
  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
  });
  function onSubmit(data: CreateTransactionSchema) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateTransactionForm;
