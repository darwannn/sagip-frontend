import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  // For filtering data:
  ColumnFiltersState,
  getFilteredRowModel,
  // For pagination:
  getPaginationRowModel,
  // For sorting:
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { userColumn } from "./UserColumn";
import DataTable from "../../components/ui/data-table";

// Redux
import { useAppSelector } from "../../store/hooks";

const UserTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data
  const [sorting, setSorting] = useState<SortingState>([]); // For sorting data

  // Get the data from redux
  const data = useAppSelector((state) => state.userManage.users);
  // TODO: ERROR HANDLING IF DATA IS EMPTY

  const table = useReactTable({
    data,
    columns: userColumn,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    //For sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
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
      <div className="flex items-center py-4 mx-5">
        <input
          placeholder="Search with ID"
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("_id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border rounded-sm px-1 py-1"
        />
      </div>
      <div className="rounded-md border mx-5">
        <DataTable table={table} columnLength={userColumn.length} />
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
