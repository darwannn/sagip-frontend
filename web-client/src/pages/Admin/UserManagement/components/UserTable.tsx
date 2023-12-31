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

import { userColumn } from "./UserColumn";
import DataTable from "../../../../components/ui/data-table";

// Redux
import { useAppSelector } from "../../../../store/hooks";
import { useGetUsersDataQuery } from "../../../../services/usersQuery";

// Icons
import PaginationControls from "../../../../components/ui/PaginationControl";
import { User } from "../../../../types/user";
import UserTableActions from "./UserTableActions";
import { selectUserFilters } from "../../../../store/slices/userManageSlice";

const UserTable = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // Service
  const { data: users, isLoading, isError, isSuccess } = useGetUsersDataQuery();
  const tableFilters = useAppSelector(selectUserFilters);
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  // Get the data from redux

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const { isArchive, roles, status } = tableFilters;
      const filter = users?.filter((user) => {
        // Staff
        if (!isStaff && user.userType !== "resident") {
          return false;
        }
        if (isStaff && user.userType === "resident") {
          return false;
        }
        // Specific Roles
        if (isStaff && roles.length > 0 && !roles.includes(user.userType)) {
          return false;
        }
        // Archive
        if (user.isArchived !== isArchive) {
          return false;
        }

        // Account Status
        if (status.length > 0 && !status.includes(user.status)) {
          return false;
        }

        return true;
      });
      setFilteredUsers(filter ?? []);
    }
  }, [users, isLoading, isSuccess, isStaff, tableFilters]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFltr, setGlobalFltr] = useState("");

  const setGlobalFilterVal = (value: string) => {
    setGlobalFltr(value);
  };

  // For sorting data
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: filteredUsers ?? [],
    columns: userColumn,
    getCoreRowModel: getCoreRowModel(),
    // For filtering data
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFltr,
    globalFilterFn: "includesString",
    // For pagination
    getPaginationRowModel: getPaginationRowModel(),
    //For sorting
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
        <UserTableActions
          globalFilterVal={globalFltr}
          setGlobalFilterVal={setGlobalFilterVal}
          table={table}
        />
      </div>
      <div className="rounded-md border mb-10 bg-white">
        <DataTable table={table} columnLength={userColumn.length} />
      </div>
      {/* PAGINATION CONTROLS */}
      <PaginationControls table={table} />
    </>
  );
};

export default UserTable;
