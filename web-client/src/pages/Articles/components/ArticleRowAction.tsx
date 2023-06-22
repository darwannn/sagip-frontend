import { useNavigate } from "react-router-dom";

type TRowAction = {
  rowId: string;
};
const ArticleRowAction = ({ rowId }: TRowAction) => {
  const navigate = useNavigate();

  const onViewHandler = () => {
    navigate(`/articles/${rowId}`);
  };

  return (
    <>
      <button
        type="button"
        className="bg-indigo-500 rounded px-3 py-1 text-white"
        onClick={onViewHandler}
      >
        View
      </button>
    </>
  );
};

export default ArticleRowAction;
