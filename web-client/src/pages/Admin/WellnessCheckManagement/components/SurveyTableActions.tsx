import { Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/Dialog";
import { TSurvey } from "../../../../types/survey";
import { RiSearchLine, RiFilter2Line } from "react-icons/ri";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import SurveyForm from "./SurveyForm";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/DropdownMenu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

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
        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-3 bg-slate-100 rounded hover:bg-slate-200">
            <RiFilter2Line className="text-lg text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="font-semibold text-gray-700 py-1 px-2">
              Filter
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                undefined
              }
              onCheckedChange={() => {
                table.getColumn("category")?.setFilterValue("");
              }}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Flood"
              }
              onCheckedChange={() => {
                table.getColumn("category")?.setFilterValue("Flood");
              }}
            >
              Flood
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Typhoon"
              }
              onCheckedChange={() => {
                table.getColumn("category")?.setFilterValue("Typhoon");
              }}
            >
              Typhoon
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Earthquake"
              }
              onCheckedChange={(value) => {
                table
                  .getColumn("category")
                  ?.setFilterValue(value ? "Earthquake" : "");
              }}
            >
              Earthquake
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Air Pollution"
              }
              onCheckedChange={(value) => {
                table
                  .getColumn("category")
                  ?.setFilterValue(value ? "Air Pollution" : "");
              }}
            >
              Air Pollution
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Volcanic Eruption"
              }
              onCheckedChange={(value) => {
                table
                  .getColumn("category")
                  ?.setFilterValue(value ? "Volcanic Eruption" : "");
              }}
            >
              Volcanic Eruption
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("category")?.getFilterValue() as string) ===
                "Tornado"
              }
              onCheckedChange={(value) => {
                table
                  .getColumn("category")
                  ?.setFilterValue(value ? "Tornado" : "");
              }}
            >
              Tornado
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
