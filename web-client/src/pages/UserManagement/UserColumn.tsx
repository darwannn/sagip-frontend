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
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <button
          className="bg-indigo-500 rounded px-3 py-1 text-white"
          onClick={() => console.log(id)}
        >
          Edit
        </button>
      );
    },
  },
];
