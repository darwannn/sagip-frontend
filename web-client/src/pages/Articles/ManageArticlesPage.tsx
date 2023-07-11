// TODO: Create a redux slice for article management state / data

// Redux
// Services
import { Link } from "react-router-dom";
import { useGetArticlesQuery } from "../../services/articleQuery";
import ArticleTable from "./components/ArticleTable";

const ManageArticlesPage = () => {
  const { data: articles, isLoading, error } = useGetArticlesQuery(undefined);

  if (error) {
    return <p>Something went wrong...</p>;
  }

  const tableComponent = articles ? (
    <ArticleTable articleData={articles} />
  ) : (
    <p>No articles found</p>
  );

  return (
    <div>
      <h1>Manage Articles Page</h1>
      <div className="mx-5">
        <Link
          className="bg-indigo-500 px-2 py-1 rounded text-white hover:bg-indigo-600"
          to={"create"}
        >
          Create Article
        </Link>
      </div>
      {isLoading ? <p>Getting articles....</p> : tableComponent}
    </div>
  );
};

export default ManageArticlesPage;
