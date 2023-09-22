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

type ResponseTableProps = {
  surveyData: TSurvey | undefined;
};

const ResponseTable: React.FC<ResponseTableProps> = memo(({ surveyData }) => {
  console.log(surveyData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data
  const [sorting, setSorting] = useState<SortingState>([]);
  // Initialiaze table configuration
  const table = useReactTable({
    data: surveyData?.responses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    // For sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
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
      <div className="rounded bg-white border  shadow mb-10">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </>
  );
});

export default ResponseTable;
