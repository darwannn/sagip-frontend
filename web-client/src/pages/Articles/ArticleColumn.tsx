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
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <button id={row.getValue("_id")}>Action</button>,
  },
];
