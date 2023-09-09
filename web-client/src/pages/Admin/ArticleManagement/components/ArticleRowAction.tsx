import { useNavigate } from "react-router-dom";
import { useDeleteArticleMutation } from "../../../../services/articleQuery";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// Icons
import { LuTrash2 } from "react-icons/lu";
import { GoKebabHorizontal } from "react-icons/go";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../../components/ui/DropdownMenu";

// Icon
import { TbPencil } from "react-icons/tb";
import { MdOutlinePreview } from "react-icons/md";

type TRowAction = {
  rowId: string;
};
const ArticleRowAction = ({ rowId }: TRowAction) => {
  const navigate = useNavigate();

  const [deleteArticle, { isLoading, isError, isSuccess, error }] =
    useDeleteArticleMutation();

  const onViewHandler = () => {
    navigate(`/preview/article/${rowId}`);
  };

  const onEditHandler = () => {
    navigate(`edit/${rowId}`);
  };

  const onDeleteHandler = async () => {
    const token = localStorage.getItem("token");
    // Show delete confirmation
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;
    // Delete article
    await deleteArticle({ token, id: rowId });
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
          <MdOutlinePreview className="text-xl" />
          <span>View</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2" onClick={onEditHandler}>
          <TbPencil className="text-lg" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 text-red-500"
          onClick={onDeleteHandler}
          disabled={isLoading}
        >
          <LuTrash2 className="" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ArticleRowAction;
