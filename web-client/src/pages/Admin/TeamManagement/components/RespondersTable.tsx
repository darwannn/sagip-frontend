import { memo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { User } from "../../../../types/user";
import { membersColumn as columns } from "../types/MembersColumn";
import DataTable from "../../../../components/ui/data-table";
type TProps = {
  membersData: User[];
};
const RespondersTable = memo(({ membersData }: TProps) => {
  const table = useReactTable({
    data: membersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded my-3">
      <DataTable table={table} columnLength={columns.length} />
    </div>
  );
});

export default RespondersTable;
