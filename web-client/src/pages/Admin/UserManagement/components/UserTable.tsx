import { useState, ChangeEvent, useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  // For filtering data:
  ColumnFiltersState,
  getFilteredRowModel,
  // For pagination:
  getPaginationRowModel,
  // For sorting:
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { userColumn, staffColumn } from "./UserColumn";
import DataTable from "../../../../components/ui/data-table";

// Redux
import { useAppSelector } from "../../../../store/hooks";
import {
  useGetUsersDataQuery,
  useGetVerificationRequestsQuery,
} from "../../../../services/usersQuery";

import { Link } from "react-router-dom";

// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import PaginationControls from "../../../../components/ui/PaginationControl";
import { User } from "../../../../types/user";

const UserTable = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // Service
  const { data: users, isLoading, isError, isSuccess } = useGetUsersDataQuery();
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  // Get the data from redux

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const filter = users?.filter((user) => {
        if (isStaff) {
          return user.userType !== "resident" && user.isArchived === false;
        } else if (!isStaff) {
          return user.userType === "resident" && user.isArchived === false;
        }
      });
      setFilteredUsers(filter ?? []);
    }
  }, [users, isLoading, isSuccess, isStaff]);

  // For filtering data
  const [searchOption, setSearchOption] = useState<string>("firstname");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // For sorting data
  const [sorting, setSorting] = useState<SortingState>([]);

  /* used to determine what action button to show */
  const token = localStorage.getItem("token");
  // const data = useAppSelector(selectUserTableData);

  const {
    data: verificationRequests,
    error: isVerificationRequestsFetchError,
  } = useGetVerificationRequestsQuery({ token });

  const table = useReactTable({
    data: filteredUsers ?? [],
    columns: isStaff ? staffColumn : userColumn,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    //For sorting
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

  if (isVerificationRequestsFetchError) {
    return <p>Something went wrong...</p>;
  }

  if (isError)
    return (
      <p className="text-center font-semibold">Oops! Something went wrong...</p>
    );

  if (isLoading) {
    return <p className="text-center font-semibold">Loading table ....</p>;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <div>
          <select
            className="max-w-sm border rounded-sm px-1 py-1 mb-2 sm:mb-0 mr-3"
            value={searchOption}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSearchOption(e.target.value);
              setColumnFilters([]);
            }}
          >
            <option value="firstname">Name</option>
            <option value="barangay">Barangay</option>
            <option value="email"> Email</option>
          </select>
          <input
            placeholder={`Search by ${searchOption}`}
            value={
              (table.getColumn(searchOption)?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn(searchOption)?.setFilterValue(e.target.value);
            }}
            className="max-w-sm border rounded-sm px-1 py-1 mb-2 sm:mb-0"
            autoComplete="off"
          />
        </div>

        <Link
          className="inline-flex first-row items-center bg-gray-200 px-2 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
          to={isStaff ? "create" : "verify-users"}
        >
          {isStaff ? (
            <>
              <BsFillPersonFill className="mr-2" /> Add Users
            </>
          ) : (
            <>
              <GiNotebook className="mr-2" /> Verification Request
              <span className="bg-red-600 text-white rounded-md px-2 ml-2">
                {verificationRequests?.length}
              </span>
            </>
          )}
        </Link>
      </div>
      <div className="rounded-md border mb-10">
        <DataTable table={table} columnLength={userColumn.length} />
      </div>
      {/* PAGINATION CONTROLS */}
      <PaginationControls table={table} />
    </>
  );
};

export default UserTable;
