import { useParams, Link } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";
import { useGetArticleByIdQuery } from "../../../services/articleQuery";

const ViewArticlePage = () => {
  // Get the params from the URL
  const { articleId } = useParams();
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
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/articles"}
      >
        Cancel
      </Link>
      <ArticleForm articleData={articleData} />
    </div>
  );
};

export default ViewArticlePage;
