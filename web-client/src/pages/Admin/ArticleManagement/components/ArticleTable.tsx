import { useState } from "react";
import { Link } from "react-router-dom";

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

// Icons
import { RiSearchLine, RiFilter2Line } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/DropdownMenu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

type TProps = {
  articleData: Article[];
};

const ArticleTable = ({ articleData: data }: TProps) => {
  // const [selectedFilter];
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
      {/* Table Action */}
      <section className="flex flex-row justify-between items center mb-5">
        {/* Query */}
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-2 items-center border xl:w-[350px] p-2 rounded">
            <RiSearchLine className="text-lg text-gray-500" />
            <input
              className="focus:outline-none"
              placeholder="Search with ID"
              value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn("_id")?.setFilterValue(e.target.value)
              }
            />
          </div>
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-3 bg-slate-100 rounded hover:bg-slate-200">
              <RiFilter2Line className="text-lg text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-semibold text-gray-700 py-1 px-2">
                Filter
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={
                  (table.getColumn("category")?.getFilterValue() as string) ===
                  undefined
                }
                onCheckedChange={() => {
                  table.getColumn("category")?.setFilterValue("");
                }}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  (table.getColumn("category")?.getFilterValue() as string) ===
                  "General Tips"
                }
                onCheckedChange={() => {
                  table.getColumn("category")?.setFilterValue("General Tips");
                }}
              >
                General Tips
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  (table.getColumn("category")?.getFilterValue() as string) ===
                  "Preparedness"
                }
                onCheckedChange={(value) => {
                  table
                    .getColumn("category")
                    ?.setFilterValue(value ? "Preparedness" : "");
                }}
              >
                Preparedness
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  (table.getColumn("category")?.getFilterValue() as string) ===
                  "Flood Safety"
                }
                onCheckedChange={() => {
                  table.getColumn("category")?.setFilterValue("Flood Safety");
                }}
              >
                Flood Safety
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  (table.getColumn("category")?.getFilterValue() as string) ===
                  "Heat Safety"
                }
                onCheckedChange={() => {
                  table.getColumn("category")?.setFilterValue("Heat Safety");
                }}
              >
                Heat Safety
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-sm text-gray-500">
            {(table.getColumn("category")?.getFilterValue() as string) !==
              undefined && (
              <span>
                Filtering:{" "}
                <span className="">
                  {table.getColumn("category")?.getFilterValue() as string}
                </span>
              </span>
            )}
          </div>
        </div>
        {/* Create */}
        <div className="">
          <Link className="btn-primary" to={"create"}>
            Create Article
          </Link>
        </div>
      </section>
      {/* <div className="my-2">
        <input
          className="p-1"
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("_id")?.setFilterValue(e.target.value)
          }
          placeholder="Search with ID"
        />

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
      </div> */}
      <div className="rounded-md border ">
        <DataTable table={table} columnLength={columns.length} />
      </div>
      <PaginationControls table={table} />
    </div>
  );
};

export default ArticleTable;
