import { Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/Dialog";
import { TSurvey } from "../../../../types/survey";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import SurveyForm from "./SurveyForm";

interface SurveyTableProps {
  table: Table<TSurvey>;
}

const SurveyTable: React.FC<SurveyTableProps> = ({ table }) => {
  return (
    <div className="py-5 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
        {/* Search table by title  */}
        <div className="flex flex-row gap-2 bg-white items-center border xl:w-[350px] p-2 rounded">
          <RiSearchLine className="text-lg text-gray-500" />
          <input
            className="flex-grow focus:outline-none"
            placeholder="Search with ID, Name"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </div>
        {/* Filter the table by category */}
        <select
          id="category"
          className="p-2 border rounded"
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("category")?.setFilterValue(e.target.value)
          }
        >
          <option value="" disabled>
            Filter by category
          </option>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
        </select>
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="btn-primary w-max float-right">
            <HiOutlineDocumentAdd className="text-lg" />
            New Wellness Check
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="">Publish Wellness Check</DialogTitle>
            </DialogHeader>
            <SurveyForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SurveyTable;
