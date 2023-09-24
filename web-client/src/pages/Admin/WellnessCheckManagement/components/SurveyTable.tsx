import { useState } from "react";
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
import { surveyColumn as columns } from "../types/SurveyColumn";
// Redux
import PaginationControls from "../../../../components/ui/PaginationControl";
import { useGetSurveyQuery } from "../../../../services/surveyQuery";

import SurveyTableActions from "./SurveyTableActions";

const SurveyTable = () => {
  const {
    data: surveyData,
    isLoading,
    isError,
    error,
  } = useGetSurveyQuery(undefined);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // For filtering data
  const [sorting, setSorting] = useState<SortingState>([]);
  // Initialiaze table configuration
  const table = useReactTable({
    data: surveyData ?? [],
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

  if (isError) {
    console.log(error);
    return (
      <p className="text-center font-semibold">Oops! Something went wrong...</p>
    );
  }

  if (isLoading) {
    return <p className="text-center font-semibold">Loading table ....</p>;
  }

  return (
    <>
      <SurveyTableActions table={table} />
      <div className="rounded bg-white border  shadow mb-10">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </>
  );
};

export default SurveyTable;
