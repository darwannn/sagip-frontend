import { ColumnDef } from "@tanstack/react-table";
// Types
import type { User } from "../../../../types/user";
import { BASE_IMAGE_URL } from "../../../../api.config";
import { GoDotFill } from "react-icons/go";
// import { HiDotsVertical } from "react-icons/hi";

export const membersColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "User ID",
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
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => {
      return <p className="">{row.original.contactNumber}</p>;
    },
  },
  {
    accessorKey: "isOnline",
    header: "Status",
    cell: ({ row }) => {
      const isOnline = row.original.isOnline;
      return (
        <div className="flex flex-row items-center">
          <GoDotFill
            className={`${isOnline ? "text-green-800" : "text-gray-500"}`}
          />
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: () => {
  //     return (
  //       <div className="flex">
  //         <button className="float-right text-xl flex justify-center items-center">
  //           <HiDotsVertical className="text-gray-500" />
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];
