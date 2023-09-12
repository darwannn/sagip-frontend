import { ColumnDef } from "@tanstack/react-table";
// Types
import { User } from "../../../../types/user";

// API
import { BASE_IMAGE_URL } from "../../../../api.config";

import UserRowAction from "./UserRowAction";
import { Badge } from "../../../../components/ui/Badge";
import { formatDateToNum } from "../../../../util/date";

export const userColumn: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      const data = row.original._id;
      return (
        <div className="w-[120px] truncate">
          <span className=" text-sm text-gray-500">{data}</span>
        </div>
      );
    },
    size: 120,
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
    id: "profilePicture",
    cell: ({ row }) => {
      const imgUrl = `${BASE_IMAGE_URL}/user/${row.original.profilePicture}`;
      return (
        <img
          src={imgUrl}
          alt="profile"
          className="w-8 h-8 rounded-full mx-auto"
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => {
      const { firstname, middlename, lastname } = row.original;

      return <span>{`${firstname} ${middlename} ${lastname}`}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Added
        </button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToNum(row.original.createdAt);
      return formattedDate;
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
      const status = row.original.status;
      let color = "bg-primary-300";
      if (status === "unverified") {
        color = "bg-gray-300";
      } else if (status === "semi-verified") {
        color = "bg-yellow-300";
      }
      return <Badge className={`text-xs capitalize ${color}`}>{status}</Badge>;
    },
  },
  {
    id: "action",
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
    cell: ({ row }) => {
      const data = row.original._id;
      return (
        <div className="w-[120px] truncate">
          <span className=" text-sm text-gray-500">{data}</span>
        </div>
      );
    },
    size: 120,
  },
  {
    id: "profilePicture",
    cell: ({ row }) => {
      const imgUrl = `${BASE_IMAGE_URL}/user/${row.original.profilePicture}`;
      return (
        <img
          src={imgUrl}
          alt="profile"
          className="w-8 h-8 rounded-full mx-auto"
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "fullname",
    header: "Name",
    cell: ({ row }) => {
      const { firstname, middlename, lastname } = row.original;

      return <span>{`${firstname} ${middlename} ${lastname}`}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
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
      const userType = row.original.userType;
      let color;

      if (userType === "super-admin") {
        color = "bg-red-300";
      } else if (userType === "admin") {
        color = "bg-blue-300";
      } else if (userType === "dispatcher") {
        color = "bg-purple-300";
      } else if (userType === "responder") {
        color = "bg-yellow-300";
      }

      return (
        <Badge
          className={`text-xs capitalize text-gray-600 rounded-md ${color}`}
        >
          {userType}
        </Badge>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  // {
  //   accessorKey: "barangay",
  //   header: ({ column }) => {
  //     return (
  //       <button
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Barangay
  //       </button>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Added
        </button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToNum(row.original.createdAt);
      return formattedDate;
    },
  },
  {
    id: "action",
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
