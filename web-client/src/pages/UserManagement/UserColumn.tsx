import { ColumnDef } from "@tanstack/react-table";

import { User } from "../../types/user";

export const userColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    id: "fullname",
    header: "Full Name",
    cell: ({ row }) => {
      const firstName = row.original.firstname;
      const middleName = row.original.middlename;
      const lastName = row.original.lastname;
      return `${firstName} ${middleName} ${lastName}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Verification Status",
  },
];
