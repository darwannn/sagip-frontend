import type { Token } from "../../../../types/auth";
import type { THazardReport } from "../../../../types/hazardReport";
import { useDeleteHazardReportMutation } from "../../../../services/hazardReportsQuery";

import jwtDecode from "jwt-decode";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../../../components/ui/DropdownMenu";

import { LuTrash2 } from "react-icons/lu";
import { BiDotsVerticalRounded } from "react-icons/bi";

type TProps = {
  hazardData: THazardReport;
};

const HazardItem = ({ hazardData }: TProps) => {
  const [deleteHazardReport, { isLoading: isDeleteLoading }] =
    useDeleteHazardReportMutation();

  const decodedToken = jwtDecode<Token>(localStorage.getItem("token") || "");
  const userId = decodedToken.id;
  return (
    <>
      {userId === hazardData.userId._id &&
        hazardData.status === "unverified" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-icon absolute top-3 right-3 text-lg p-2 rounded transition-all duration-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 visiblity-">
                  <BiDotsVerticalRounded className="text-lg" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white absolute right-0">
                <DropdownMenuItem
                  className="hover:bg-gray-100 text-base"
                  disabled={isDeleteLoading}
                  onClick={() =>
                    confirm("DO you want to really delete this request") &&
                    deleteHazardReport(hazardData._id)
                  }
                >
                  <span className="mr-2 h-4 w-4">
                    <LuTrash2 />
                  </span>{" "}
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
    </>
  );
};

export default HazardItem;
