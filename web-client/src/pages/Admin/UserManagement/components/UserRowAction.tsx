import { useNavigate } from "react-router-dom";
import { useArchiveUserMutation } from "../../../../services/usersQuery";

type PROPS = {
  rowId: string;
  isArchived: boolean;
};

const UserRowAction = ({ rowId, isArchived }: PROPS) => {
  const navigate = useNavigate();

  const [archiveUser, { isLoading, isError, isSuccess, error }] =
    useArchiveUserMutation();

  const onViewHandler = () => {
    navigate(`./${rowId}`);
  };

  const onArchiveHandler = async () => {
    // Show delete confirmation
    const confirm = window.confirm(
      `Are you sure you want to ${isArchived ? "unarchive" : "archive"
      } this account?`
    );
    if (!confirm) return;
    // Delete article
    await archiveUser({
      action: isArchived ? "unarchive" : "archive",
      id: rowId,
    });
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
        onClick={onArchiveHandler}
      >
        {isLoading ? "Loading..." : `${isArchived ? "Unarchive" : "Archive"}`}
      </button>
    </div>
  );
};

export default UserRowAction;
