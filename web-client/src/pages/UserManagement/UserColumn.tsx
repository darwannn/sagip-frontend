import { ColumnDef } from "@tanstack/react-table";

import { User } from "../../types/user";

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
      const imgUrl = `https://sagip.onrender.com/images/User/${displayPictureName}`;
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
    id: "fullname",
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
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="w-max flex justify-center align-center">
          <button
            className="bg-indigo-500 rounded px-3 py-1 text-white"
            onClick={() => console.log(id)}
          >
            Edit
          </button>
        </div>
      );
    },
    meta: {
      width: "100px",
    },
  },
];
