import { useState, useEffect } from "react";
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
import { useGetUsersDataQuery } from "../../../../services/usersQuery";

// Icons
import PaginationControls from "../../../../components/ui/PaginationControl";
import { User } from "../../../../types/user";
import UserTableActions from "./UserTableActions";

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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // For sorting data
  const [sorting, setSorting] = useState<SortingState>([]);

  // const data = useAppSelector(selectUserTableData);

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
        {/* Table Actions */}
        <UserTableActions table={table} />
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
