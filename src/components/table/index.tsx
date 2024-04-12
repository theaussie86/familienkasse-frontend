import TablePagination from "./pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnSort,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { classNames } from "../../util";

const sortingMap = {
  asc: <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />,
  desc: <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />,
  false: null,
};

function WeissteinerTable<TData>({
  data,
  columns,
  isSearchable = true,
  showPagination = true,
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  isSearchable?: boolean;
  showPagination?: boolean;
}) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filter, setFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  return (
    <>
      {isSearchable ? (
        <div className="mb-2 mt-5">
          <input
            name="search"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Suche..."
          />
        </div>
      ) : null}
      <div
        className={classNames(
          isSearchable ? "mt-2" : "mt-5",
          "overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
        )}
      >
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 hover:cursor-pointer"
                    onClick={column.column.getToggleSortingHandler()}
                  >
                    <span className="flex gap-2">
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                      {
                        sortingMap[
                          column.column.getIsSorted() === false
                            ? "false"
                            : (column.column.getIsSorted() as "asc" | "desc")
                        ]
                      }
                    </span>
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
        {showPagination ? <TablePagination table={table} /> : null}
      </div>
    </>
  );
}

export default WeissteinerTable;
