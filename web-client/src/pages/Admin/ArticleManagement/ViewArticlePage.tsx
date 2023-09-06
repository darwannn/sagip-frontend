import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";
import { useGetArticleByIdQuery } from "../../../services/articleQuery";

const ViewArticlePage = () => {
  // Get the params from the URL
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    data: articleData,
    isLoading,
    error,
  } = useGetArticleByIdQuery(articleId);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="m-5">
      <button
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <ArticleForm articleData={articleData} />
    </div>
  );
};

export default ViewArticlePage;
