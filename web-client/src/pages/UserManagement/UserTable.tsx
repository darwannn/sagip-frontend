import { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  // For filtering data:
  ColumnFiltersState,
  getFilteredRowModel,
  // For pagination:
  getPaginationRowModel,
} from "@tanstack/react-table";

import { User } from "../../types/user";
import DataTable from "../../components/ui/data-table";

type UserTableProps = {
  data: User[];
  column: ColumnDef<User>[];
};

const UserTable = ({ data, column }: UserTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <h1>TABLE HERE</h1>
      <div className="flex items-center py-4 mx-5">
        <input
          placeholder="Search with ID"
          // value={
          //   (table.getColumn("firstname")?.getFilterValue() as string) ?? ""
          // }
          onChange={(event) =>
            table.getColumn("_id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border rounded-sm px-1 py-1"
        />
      </div>
      <div className="rounded-md border mx-5">
        <DataTable table={table} columnLength={column.length} />
      </div>
      {/* PAGINATION CONTROLS */}
      <div className="flex justify-between items-center px-5 py-3">
        <button
          className="border px-3 py-1 rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <div>
          <span className="text-sm">{`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}</span>
        </div>
        <button
          className="border px-3 py-1 rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserTable;
