import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import DataTable from "../../../../components/ui/data-table";
import { surveyColumn as columns } from "../types/SurveyColumn";
// Redux
import PaginationControls from "../../../../components/ui/PaginationControl";
import { TSurvey } from "../../../../types/alert";
type TProps = {
  alertData: TSurvey[];
};

const SurveyTable = ({ alertData: data }: TProps) => {
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
    <div className="">
      <div className="my-2">
        {/* Search table by title  */}
        <input
          className="p-1"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          placeholder="Search by title"
        />
        {/* Filter the table by category */}
        <select
          id="category"
          className="p-1 ml-2 border rounded-md float-right"
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
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
        </select>
      </div>
      <div className="rounded-md border ">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </div>
  );
};

export default SurveyTable;
