import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { TSurvey } from "../../../../types/alert";
import AlertRowAction from "../components/AlertRowAction";

export const alertColumn: ColumnDef<TSurvey>[] = [
  {
    accessorKey: "_id",
    header: "ID",
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
    header: "Date Published",
    cell: ({ row }) => {
      const data = moment(row.original.startDate).format("MMM DD, YYYY");
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
    header: "Actions",
    cell: ({ row }) => <AlertRowAction rowId={row.getValue("_id")} />,
  },
];
