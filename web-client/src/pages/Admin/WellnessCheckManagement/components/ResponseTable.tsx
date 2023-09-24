import { useState, memo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import DataTable from "../../../../components/ui/data-table";
import { responseColumn as columns } from "../types/SurveyColumn";
// Redux
import PaginationControls from "../../../../components/ui/PaginationControl";

import { TSurvey } from "../../../../types/survey";
import { RiSearchLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";

type ResponseTableProps = {
  surveyData: TSurvey | undefined;
};

const ResponseTable: React.FC<ResponseTableProps> = memo(({ surveyData }) => {
  // For filtering data
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFltr, setGlobalFltr] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);
  // Initialiaze table configuration
  const table = useReactTable({
    data: surveyData?.responses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFltr,
    getFilteredRowModel: getFilteredRowModel(),
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    // For sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: globalFltr,
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 text-sm">
          <div className="flex flex-row gap-2">
            {/* Search table by title  */}
            <div className="flex flex-row gap-2 bg-white items-center border xl:w-[350px] p-2 rounded">
              <RiSearchLine className="text-lg text-gray-500" />
              <input
                className="flex-grow focus:outline-none"
                placeholder="Search with ID, Name, Email or Barangay"
                value={globalFltr}
                onChange={(e) => setGlobalFltr(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <select
              id="category"
              className="p-2 border rounded text-sm"
              value={
                (table.getColumn("response")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("response")?.setFilterValue(e.target.value)
              }
            >
              <option value="" disabled>
                Filter Response
              </option>
              <option value="Affected">Affected</option>
              <option value="Unaffected">Unaffected</option>
            </select>
            <>
              {table.getColumn("response")?.getFilterValue() && (
                <button
                  className="p-1  rounded text-gray-500 hover:bg-slate-200"
                  onClick={() =>
                    table.getColumn("response")?.setFilterValue("")
                  }
                >
                  <MdClose className="text-lg" />
                </button>
              )}
            </>
          </div>
        </div>
      </div>
      <div className="rounded bg-white border  shadow mb-10">
        <DataTable
          table={table}
          columnLength={table.getAllFlatColumns().length}
        />
      </div>
      <PaginationControls table={table} />
    </>
  );
});

export default ResponseTable;
