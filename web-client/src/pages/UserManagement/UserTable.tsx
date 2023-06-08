import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User, UserDisplayInfo } from "../../types/user";
import { useState } from "react";

type UserTableProps = {
  data: User[];
};
const UserTable = ({ data }: UserTableProps) => {
  const columnHelper = createColumnHelper<UserDisplayInfo>();
  const columns = [
    columnHelper.accessor("_id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstname", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("middlename", {
      header: "Middle Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastname", {
      header: "Last Name",
      cell: (info) => info.getValue(),
    }),
  ];

  const [searchText, setSearchText] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setSearchText,
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
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
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
