import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
// Types
import { Article } from "../../types/article";

export const articleColumn: ColumnDef<Article>[] = [
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
    accessorKey: "views",
    header: "Views Count",
  },
  {
    accessorKey: "createdAt",
    header: "Published Date",
    cell: ({ row }) => {
      const data = moment(row.original.createdAt).format("MMM DD, YYYY");
      return <span>{data}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const data = moment(row.original.updatedAt).format("MMM DD, YYYY");
      return <span>{data}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <button id={row.getValue("_id")}>Action</button>,
  },
];
