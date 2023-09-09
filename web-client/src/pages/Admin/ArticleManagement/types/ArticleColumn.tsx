import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
// Types
import { Article } from "../../../../types/article";
import ArticleRowAction from "../components/ArticleRowAction";
import { Badge } from "../../../../components/ui/Badge";
import { Link } from "react-router-dom";

export const articleColumn: ColumnDef<Article>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      const data = row.original._id;
      return (
        <div className="w-[100px] truncate">
          <span className=" text-sm text-gray-500">{data}</span>
        </div>
      );
    },
    size: 80,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const data = row.original.title;
      return (
        <Link
          to={`/admin/manage-articles/${row.original._id}`}
          className="font-semibold text-gray-700"
        >
          {data}
        </Link>
      );
    },
    size: 600,
  },
  {
    accessorKey: "category",
    header: "Category",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original.status;
      const color =
        data === "draft"
          ? "bg-yellow-500 hover:bg-yellow-500"
          : "bg-green-500 hover:bg-green-500";
      return (
        <Badge className={` capitalize cursor-default ${color}`}>{data}</Badge>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Published Date",
  //   cell: ({ row }) => {
  //     const data = moment(row.original.createdAt).format("MMM DD, YYYY");
  //     return <span>{data}</span>;
  //   },
  // },

  {
    id: "actions",
    cell: ({ row }) => <ArticleRowAction rowId={row.getValue("_id")} />,
  },
];
