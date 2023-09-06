import { useNavigate } from "react-router-dom";
import { useDeleteSurveyMutation } from "../../../../services/surveyQuery";
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
    <div className="flex flex-col">
      <button
        type="button"
        className="bg-indigo-500 rounded px-3 py-1 text-white"
        onClick={onViewHandler}
      >
        View
      </button>
      <button
        type="button"
        className="bg-red-500 rounded px-3 py-1 text-white my-1"
        onClick={onDeleteHandler}
      >
        {isLoading ? "Loading..." : "Delete"}
      </button>
      <button
        type="button"
        className="bg-indigo-500 rounded px-3 py-1 text-white"
        onClick={onGenerateReportHandler}
      >
        {isLoading ? "Loading..." : "Report"}
      </button>
    </div>
  );
};

export default SurveyTableRowAction;
