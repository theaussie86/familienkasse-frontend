import TablePagination from "./pagination";
import mData from "./MOCK_DATA.json";
import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

function WeissteinerTable() {
  const data = useMemo(() => mData, []);

  const columnHelper = createColumnHelper<(typeof data)[0]>();

  const columns = [
    columnHelper.accessor("created", {
      cell: (cell) =>
        new Intl.DateTimeFormat("de-DE", {
          dateStyle: "medium",
          timeZone: "Europe/Berlin",
        }).format(new Date(cell.getValue())),
      header: "Datum",
    }),
    columnHelper.accessor("description", {
      cell: (cell) => cell.getValue(),
      header: "Beschreibung",
    }),
    columnHelper.accessor("amount", {
      cell: (cell) =>
        (cell.getValue() / 100).toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
        }),
      header: "Betrag",
    }),
    columnHelper.accessor("account", {
      cell: (cell) => cell.getValue(),
      header: "Konto",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {flexRender(
                    column.column.columnDef.header,
                    column.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination table={table} />
    </div>
  );
}

export default WeissteinerTable;
