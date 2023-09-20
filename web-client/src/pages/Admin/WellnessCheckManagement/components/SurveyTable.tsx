import { useState } from "react";
import { Link } from "react-router-dom";
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
import { RiSearchLine } from "react-icons/ri";
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
      <div className="py-5 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          {/* Search table by title  */}
          <div className="flex flex-row gap-2 bg-white items-center border xl:w-[350px] p-2 rounded">
            <RiSearchLine className="text-lg text-gray-500" />
            <input
              className="flex-grow focus:outline-none"
              placeholder="Search with ID, Name"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("title")?.setFilterValue(e.target.value)
              }
            />
          </div>
          {/* Filter the table by category */}
          <select
            id="category"
            className="p-2 border rounded"
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
        <div>
          <Link className="btn-primary w-max float-right" to={"create"}>
            New Survey
          </Link>
        </div>
      </div>
      <div className="rounded bg-white border  shadow mb-10">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </>
  );
};

export default SurveyTable;
