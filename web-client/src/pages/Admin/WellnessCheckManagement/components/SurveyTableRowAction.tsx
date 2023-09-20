import { useNavigate } from "react-router-dom";
import { useDeleteSurveyMutation } from "../../../../services/surveyQuery";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../../components/ui/DropdownMenu";
import { GoKebabHorizontal } from "react-icons/go";
import { TbPencil, TbReportAnalytics } from "react-icons/tb";
import { LuTrash2 } from "react-icons/lu";

type TRowAction = {
  rowId: string;
};
const SurveyTableRowAction = ({ rowId }: TRowAction) => {
  const navigate = useNavigate();

  const [deleteAlert, { isLoading, isError, isSuccess, error }] =
    useDeleteSurveyMutation();

  const onViewHandler = () => {
    navigate(`/admin/wellness-check/${rowId}`);
  };
  const onGenerateReportHandler = () => {
    //navigate(`/disaster-alerts/report/${rowId}`);
    /* opens the link in a new tab */
    window.open(`/wellness-check/report/${rowId}`, "_blank");
  };

  const onDeleteHandler = async () => {
    const token = localStorage.getItem("token");

    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    await deleteAlert({ token, id: rowId });
    if (isSuccess) {
      console.log("Deleted");
    }
    if (isError) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="float-right p-1.5 rounded hover:bg-slate-200">
        <GoKebabHorizontal className="text-lg" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-48">
        <DropdownMenuLabel className="font-semibold text-gray-700 py-1 px-2">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2" onClick={onViewHandler}>
          <TbPencil className="text-md" />
          <span>View and Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={onGenerateReportHandler}
        >
          <TbReportAnalytics className="text-md" />
          <span>Generate Report</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 text-red-500"
          onClick={onDeleteHandler}
          disabled={isLoading}
        >
          <LuTrash2 className="text-md" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <div className="flex flex-col">
    //   <button
    //     type="button"
    //     className="bg-indigo-500 rounded px-3 py-1 text-white"
    //     onClick={onViewHandler}
    //   >
    //     View
    //   </button>
    //   <button
    //     type="button"
    //     className="bg-red-500 rounded px-3 py-1 text-white my-1"
    //     onClick={onDeleteHandler}
    //   >
    //     {isLoading ? "Loading..." : "Delete"}
    //   </button>
    //   <button
    //     type="button"
    //     className="bg-indigo-500 rounded px-3 py-1 text-white"
    //     onClick={onGenerateReportHandler}
    //   >
    //     {isLoading ? "Loading..." : "Report"}
    //   </button>
    // </div>
  );
};

export default SurveyTableRowAction;
