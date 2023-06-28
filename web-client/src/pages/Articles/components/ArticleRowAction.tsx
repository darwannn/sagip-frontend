import { useNavigate } from "react-router-dom";
import { useDeleteArticleMutation } from "../../../services/articleQuery";
type TRowAction = {
  rowId: string;
};
const ArticleRowAction = ({ rowId }: TRowAction) => {
  const navigate = useNavigate();

  const [deleteArticle, { isLoading, isError, isSuccess, error }] =
    useDeleteArticleMutation();

  const onViewHandler = () => {
    navigate(`/articles/${rowId}?mode=view`);
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
    <div>
      <button
        type="button"
        className="bg-indigo-500 rounded px-3 py-1 text-white"
        onClick={onViewHandler}
      >
        View
      </button>
      <button
        type="button"
        className="bg-red-500 rounded px-3 py-1 text-white"
        onClick={onDeleteHandler}
      >
        {isLoading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default ArticleRowAction;
