import { useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";

const CreateArticlesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-5">
      <button
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="max-w-[1000px] mx-auto">
        <ArticleForm />
      </div>
    </div>
  );
};

export default CreateArticlesPage;
