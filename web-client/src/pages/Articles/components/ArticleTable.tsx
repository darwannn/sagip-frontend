import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import DataTable from "../../../components/ui/data-table";
import { articleColumn as columns } from "../types/ArticleColumn";
// Redux
import { useAppSelector } from "../../../store/hooks";
import { selectArticles } from "../../../store/slices/articleSlice";

const ArticleTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data
  // Get the table data from redux
  const data = useAppSelector(selectArticles);
  // Initialiaze table configuration
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="mx-5">
      <div className="my-2">
        <input
          className="p-1"
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("_id")?.setFilterValue(e.target.value)
          }
          placeholder="Search with ID"
        />
      </div>
      <div className="rounded-md border ">
        <DataTable table={table} columnLength={columns.length} />
      </div>
    </div>
  );
};

export default ArticleTable;
