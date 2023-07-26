import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { User } from "../../../types/user";
import { membersColumn as columns } from "../Types/MembersColumn";
import DataTable from "../../../components/ui/data-table";
type TProps = {
  membersData: User[];
};
const MembersTable = ({ membersData }: TProps) => {
  const table = useReactTable({
    data: membersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded">
      <DataTable table={table} columnLength={columns.length} />
    </div>
  );
};

export default MembersTable;
