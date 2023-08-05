import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../../../services/usersApi";

type PROPS = {
  rowId: string;
};

const UserRowAction = ({ rowId }: PROPS) => {
  const navigate = useNavigate();

  const [deleteUser, { isLoading, isError, isSuccess, error }] =
    useDeleteUserMutation();

  const onViewHandler = () => {
    navigate(`./${rowId}`);
  };

  const onDeleteHandler = async () => {
    const token = localStorage.getItem("token");
    // Show delete confirmation
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;
    // Delete article
    await deleteUser({ token, id: rowId });
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
        className="bg-indigo-500 rounded px-3 py-1 text-white mb-1"
        onClick={onViewHandler}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View"}
      </button>
      <button
        type="button"
        className="bg-red-500 rounded px-3 py-1 text-white "
        onClick={onDeleteHandler}
      >
        {isLoading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default UserRowAction;
