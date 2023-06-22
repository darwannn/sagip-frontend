import { useParams } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";
import { useGetArticleByIdQuery } from "../../services/articleQuery";

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
    // TODO: Handle error
    return <p>Something went wrong</p>;
  }

  return (
    <div className="m-5">
      <ArticleForm articleData={articleData} />
    </div>
  );
};

export default ViewArticlePage;
