import { ColumnDef } from "@tanstack/react-table";
// Types
import { User } from "../../../../types/user";

// API
import { BASE_IMAGE_URL } from "../../../../api.config";

import UserRowAction from "./UserRowAction";

export const userColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "profilePicture",
    header: "",
    cell: ({ row }) => {
      const displayPictureName = row.original.profilePicture;
      const imgUrl = `${BASE_IMAGE_URL}/user/${displayPictureName}`;
      return (
        <img
          src={imgUrl}
          alt="profile"
          className="w-10 h-10 rounded-full mx-auto"
        />
      );
    },
    meta: {
      width: "80px",
      minWidth: "80px",
    },
  },
  /*  {
    accessorKey: "fullname",
    // header: () => {
    //   // Centered text "Full Name"
    //   return <h2 className="">Full Name</h2>;
    // },
    header: "Full Name",
    columns: [
      {
        accessorKey: "firstname",
        header: "First Name",
      },
      {
        accessorKey: "middlename",
        header: "Middle Name",
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
      },
    ],
  }, */
  {
    accessorKey: "firstname",
    header: "Name",
    cell: ({ row }) => {
      const { firstname, middlename, lastname } = row.original;
      return `${firstname} ${middlename} ${lastname}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "barangay",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barangay
        </button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verification Status
        </button>
      );
    },
    cell: ({ row }) => {
      return row.original.status.toUpperCase();
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <UserRowAction
        isArchived={row.original.isArchived}
        rowId={row.original._id}
      />
    ),
    meta: {
      width: "100px",
    },
  },
];
export const staffColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "profilePicture",
    header: "",
    cell: ({ row }) => {
      const displayPictureName = row.original.profilePicture;
      const imgUrl = `${BASE_IMAGE_URL}/user/${displayPictureName}`;
      return (
        <img
          src={imgUrl}
          alt="profile"
          className="w-10 h-10 rounded-full mx-auto"
        />
      );
    },
    meta: {
      width: "80px",
      minWidth: "80px",
    },
  },

  {
    accessorKey: "firstname",
    header: "Name",
    cell: ({ row }) => {
      const { firstname, middlename, lastname } = row.original;
      return `${firstname} ${middlename} ${lastname}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "barangay",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barangay
        </button>
      );
    },
  },
  {
    accessorKey: "userType",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
        </button>
      );
    },
    cell: ({ row }) => {
      return row.original.userType.toUpperCase();
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <UserRowAction
        isArchived={row.original.isArchived}
        rowId={row.original._id}
      />
    ),
    meta: {
      width: "100px",
    },
  },
];
