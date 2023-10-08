import type { TAssistanceRequest } from "../../../../types/assistanceRequest";
import { useDeleteAssistanceRequestMutation } from "../../../../services/assistanceRequestQuery";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../../../components/ui/DropdownMenu";

import { LuTrash2 } from "react-icons/lu";
import { BiDotsVerticalRounded } from "react-icons/bi";

type TProps = {
  assistanceData: TAssistanceRequest | null;
};

const DetailsActionButton = ({ assistanceData }: TProps) => {
  const [deleteHazardReport, { isLoading: isDeleteLoading, isError }] =
    useDeleteAssistanceRequestMutation();
  if (isError) console.log(isError);
  return (
    <>
      {(assistanceData?.status === "unverified" ||
        assistanceData?.status === "incomplete") && (
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
                  confirm("Do you really want to cancel your request?") &&
                  deleteHazardReport(assistanceData?._id)
                }
              >
                <span className="mr-2 h-4 w-4">
                  <LuTrash2 />
                </span>{" "}
                <span>Cancel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};

export default DetailsActionButton;
