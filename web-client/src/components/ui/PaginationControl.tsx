import { Table } from "@tanstack/react-table";

type TProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
};

const PaginationControls = ({ table }: TProps) => {
  return (
    <div className="flex justify-between items-center px-5 py-3">
      <button
        className="border px-3 py-1 rounded"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <div>
        <span className="text-sm">{`Page ${
          table.getState().pagination.pageIndex + 1
        } of ${table.getPageCount()}`}</span>
      </div>
      <button
        className="border px-3 py-1 rounded"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
