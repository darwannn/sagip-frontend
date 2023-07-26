import { ColumnDef } from "@tanstack/react-table";
// Types
import type { User } from "../../../types/user";
import { BASE_IMAGE_URL } from "../../../api.config";

export const membersColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      return <p className="">{row.original._id}</p>;
    },
    meta: {
      width: "",
    },
  },
  {
    id: "userInformation",
    header: "User Information",
    cell: ({ row }) => {
      const displayPicture = row.original.profilePicture;
      const imgUrl = `${BASE_IMAGE_URL}/user/${displayPicture}`;
      const fullName = `${row.original.firstname} ${row.original.lastname}`;
      return (
        <div className="flex items-center w-max">
          <img src={imgUrl} alt="profile" className="w-10 h-10 rounded-full" />
          <div className="ml-2">
            <h2 className="text-md font-semibold">{fullName}</h2>
            <p className="text-xs">{row.original.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.userType}</p>;
    },
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => {
      return <p className="">{row.original.contactNumber}</p>;
    },
  },
];
