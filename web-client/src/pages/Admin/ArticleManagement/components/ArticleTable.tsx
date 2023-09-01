import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import DataTable from "../../../../components/ui/data-table";
import { articleColumn as columns } from "../types/ArticleColumn";
// Redux
import PaginationControls from "../../../../components/ui/PaginationControl";
import { Article } from "../../../../types/article";

type TProps = {
  articleData: Article[];
};

const ArticleTable = ({ articleData: data }: TProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data
  // Initialiaze table configuration
  const table = useReactTable({
    data,
    columns,
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
        pageSize: 10,
      },
    },
  });

  return (
    <div className="mx-5">
      <div className="my-2">
        {/* Search table with id  */}
        <input
          className="p-1"
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("_id")?.setFilterValue(e.target.value)
          }
          placeholder="Search with ID"
        />
        {/* Filter the table by category */}
        <select
          id="category"
          className="p-1 ml-2 border rounded-md"
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("category")?.setFilterValue(e.target.value)
          }
        >
          <option value="" disabled>
            Filter by category
          </option>
          <option value="General Tips">General Tips</option>
          <option value="Preparedness">Preparedness</option>
          <option value="Flood Safety">Flood Safety</option>
          <option value="Heat Safety">Heat Safety</option>
        </select>
      </div>
      <div className="rounded-md border ">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </div>
  );
};

export default ArticleTable;
