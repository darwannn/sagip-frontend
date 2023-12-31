import { Table, flexRender } from "@tanstack/react-table";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

type PROPS = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  columnLength?: number;
};

const DataTable = ({ table, columnLength }: PROPS) => {
  return (
    <ShadTable className="">
      <TableHeader className="bg-primary-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{
                    width:
                      header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                  colSpan={header.colSpan}
                  className="text-sm text-primary-500 font-medium"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columnLength ? columnLength : 1}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </ShadTable>
  );
};

export default DataTable;
