import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "../../components/ui/data-table";
import { articleColumn as columns } from "./ArticleColumn";
// Redux
import { useAppSelector } from "../../store/hooks";
import { selectArticles } from "../../store/slices/articleSlice";

const ArticleTable = () => {
  // Get the table data from redux
  const data = useAppSelector(selectArticles);
  // Initialiaze table configuration
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mx-5">
      <DataTable table={table} columnLength={columns.length} />
    </div>
  );
};

export default ArticleTable;
