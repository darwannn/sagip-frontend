import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { TSurvey } from "../../../../types/survey";
import SurveyTableRowAction from "../components/SurveyTableRowAction";

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
    header: "Date Published",
    cell: ({ row }) => {
      const data = moment(row.original.startDate).format("MMM DD, YYYY");
      return <span>{data}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "Date Closed",
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
