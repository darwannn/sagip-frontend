import { useNavigate } from "react-router-dom";
import { useArchiveUserMutation } from "../../../../services/usersQuery";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// Icons
import { LuTrash2 } from "react-icons/lu";
import { GoKebabHorizontal } from "react-icons/go";
import { TbPencil } from "react-icons/tb";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../../components/ui/DropdownMenu";

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
      `Are you sure you want to ${
        isArchived ? "unarchive" : "archive"
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
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded hover:bg-slate-200">
        <GoKebabHorizontal className="text-lg" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel className="font-semibold text-gray-700 py-1 px-2">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2" onClick={onViewHandler}>
          <TbPencil className="text-md" />
          <span>View and Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 text-red-500"
          onClick={onArchiveHandler}
          disabled={isLoading}
        >
          <LuTrash2 className="text-md" />
          <span>{`${isArchived ? "Unarchived" : "Archive"}`}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="flex flex-col">
    //   <button
    //     className="bg-indigo-500 rounded px-3 py-1 text-white mb-1"
    //     onClick={onViewHandler}
    //     disabled={isLoading}
    //   >
    //     {isLoading ? "Loading..." : "View"}
    //   </button>
    //   <button
    //     type="button"
    //     className="bg-red-500 rounded px-3 py-1 text-white "
    //     onClick={onArchiveHandler}
    //   >
    //     {isLoading ? "Loading..." : `${isArchived ? "Unarchive" : "Archive"}`}
    //   </button>
    // </div>
  );
};

export default UserRowAction;
