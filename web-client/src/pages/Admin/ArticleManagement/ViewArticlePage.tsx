import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm";
import { useGetArticleByIdQuery } from "../../../services/articleQuery";
import { IoMdArrowRoundBack } from "react-icons/io";

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
    <div className="m-5 py-5">
      <div className="max-w-[1000px] mx-auto">
        <section className="mb-5 flex gap-2">
          <button
            className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
          </button>
          <h1 className="text-2xl font-semibold text-primary-500">
            Edit Article
          </h1>
        </section>
        <hr />
        <ArticleForm articleData={articleData} />
      </div>
    </div>
  );
};

export default ViewArticlePage;
