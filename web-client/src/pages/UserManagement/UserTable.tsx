import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // For filtering data:
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { User } from "../../types/user";
import { useState } from "react";

type UserTableProps = {
  data: User[];
  column: ColumnDef<User>[];
};

const UserTable = ({ data, column }: UserTableProps) => {
  const [searchText, setSearchText] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const searchTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <h1>TABLE HERE</h1>
      <div className="flex items-center py-4">
        <input
          placeholder="Search with ID"
          // value={
          //   (table.getColumn("firstname")?.getFilterValue() as string) ?? ""
          // }
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div>
        <table className="rounded mx-auto">
          <thead className="border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={column.length} className="h-24 text-center">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
