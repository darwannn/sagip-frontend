import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "../../types/user";
import { useState } from "react";

type UserTableProps = {
  data: User[];
  column: ColumnDef<User>[];
};

const UserTable = ({ data, column }: UserTableProps) => {
  const [searchText, setSearchText] = useState("");

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  const searchTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <h1>TABLE HERE</h1>
      <input
        type="text"
        className="border-2 rounded p-1 m-2"
        placeholder="Search"
        onChange={searchTextChangeHandler}
        value={searchText}
      />
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
