import * as original from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface TableMeta<TData extends CreateTransactionSchema> {
    deleteTransaction: (_id: CreateTransactionSchema["_id"]) => void;
    updateTransaction: (
      _id: CreateTransactionSchema["_id"],
      data: Partial<Omit<CreateTransactionSchema, "_id">>
    ) => void;
  }
}
export = original;
