declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    deleteTransaction: (id: string) => void;
  }
}
