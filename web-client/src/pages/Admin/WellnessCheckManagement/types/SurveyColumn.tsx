import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { TResponse, TSurvey } from "../../../../types/survey";
import SurveyTableRowAction from "../components/SurveyTableRowAction";
import { Badge } from "../../../../components/ui/Badge";

export const surveyColumn: ColumnDef<TSurvey>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    size: 100,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "startDate",
    id: "startDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Published
        </button>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const data = moment(row.original.startDate).format("MMM DD, YYYY");
      return <span>{data}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Ended
        </button>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const data = moment(row.original.endDate).format("MMM DD, YYYY");
      return <span>{data}</span>;
    },
  },
  {
    accessorKey: "responses",
    header: "Responses",
    cell: ({ row }) => {
      const responses =
        row.original.affected.length + row.original.unaffected.length;
      return <span>{responses}</span>;
    },
  },
  // {
  //   accessorKey: "affected",
  //   header: "Affected",
  //   cell: ({ row }) => {
  //     return <span>{row.original.affected.length }</span>;
  //   },
  // },
  // {
  //   accessorKey: "unaffected",
  //   header: "Unffected",
  //   cell: ({ row }) => {
  //     return <span>{row.original.unaffected.length }</span>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <SurveyTableRowAction rowId={row.getValue("_id")} />,
  },
];

export const responseColumn: ColumnDef<TResponse>[] = [
  {
    id: "userInfo",
    header: () => <p className="text-center">User Information</p>,
    columns: [
      {
        accessorKey: "user._id",
        header: "ID",
      },
      {
        accessorKey: "user",
        // id: "fullName",
        accessorFn: ({ user }) => {
          return `${user.firstname} ${user.lastname}`;
        },
        header: "Full Name",
        cell: ({ row }) => {
          return (
            <span>{`${row.original.user.firstname} ${row.original.user.lastname}`}</span>
          );
        },
      },
      {
        accessorKey: "user.email",
        header: "Email",
      },
      {
        accessorKey: "user.contactNumber",
        header: "Contact Number",
      },
      {
        accessorKey: "user.barangay",
        header: "Barangay",
      },
    ],
  },
  {
    accessorKey: "response",
    id: "response",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Response
        </button>
      );
    },
    cell: ({ row }) => {
      const response = row.original.response;
      if (response === "Affected") {
        return <Badge className="bg-red-500 min-w-max">{response}</Badge>;
      } else if (response === "Unaffected") {
        return <Badge className="bg-green-500 min-w-max">{response}</Badge>;
      } else {
        return <Badge className="bg-gray-500 min-w-max">Invalid</Badge>;
      }
    },
  },
];
