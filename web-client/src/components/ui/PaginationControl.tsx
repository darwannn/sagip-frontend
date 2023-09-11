import { Table } from "@tanstack/react-table";

// Icons
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

type TProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
};

const PaginationControls = ({ table }: TProps) => {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  /**
   * NOT SURE HOW THIS WORKS,
   * BUT IT SOMEHOW WORKS.
   * SO DONT TOUCH IT!
   */
  const numOfRows = Math.min(
    table.getState().pagination.pageSize * currentPage,
    table.getFilteredRowModel().rows.length
  );

  /**
   * UNTESTED FEATURE
   * This function is used to render the pagination buttons
   * based on the current page and the total number of pages
   * @returns Buttons for pagination
   */
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtonsToShow = 5; // Adjust the number of buttons to show

    // Calculate the range of page buttons to display
    let startPage = Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 1);
    const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

    // Ensure that we always show maxButtonsToShow buttons
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => table.setPageIndex(page - 1)}
          className={`${
            page === currentPage ? "bg-blue-100" : "bg-gray-100"
          } h-[30px] w-[30px] rounded text-sm `}
        >
          {page}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <section className="mt-auto flex justify-between items-center">
      <div className="flex gap-3">
        <button
          className="bg-gray-100 p-2 rounded hover:bg-blue-200 disabled:border disabled:bg-transparent"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MdOutlineNavigateBefore className="text-lg" />
        </button>
        <div className="flex gap-1 items-center">{renderPageButtons()}</div>

        <button
          className="bg-gray-100 p-2 rounded hover:bg-blue-200 disabled:border disabled:bg-transparent"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <MdOutlineNavigateNext className="text-lg" />
        </button>
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-10">
        <span>
          Showing {numOfRows} of {table.getFilteredRowModel().rows.length}
        </span>
        <div>
          <label htmlFor="listSize" className="font-semibold">
            Listing per page
          </label>
          <select
            name="listSize"
            id="listSize"
            className="border p-1 rounded ml-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default PaginationControls;
