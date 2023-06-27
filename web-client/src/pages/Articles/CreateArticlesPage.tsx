import { Link } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";

const CreateArticlesPage = () => {
  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/articles"}
      >
        Cancel
      </Link>
      <ArticleForm />
    </div>
  );
};

export default CreateArticlesPage;
