// TODO: Create a redux slice for article management state / data

// Redux
// Services
import { useGetArticlesQuery } from "../../../services/articleQuery";
import ArticleTable from "./components/ArticleTable";
import ArticleStatistics from "./components/ArticleStatistics";

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
    <div className="p-10 min-h-screen flex flex-col">
      {/* PAGE HEADER */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-primary-500">Manage Articles</h1>
        <p>Manage create and post contents.</p>
      </div>
      <hr />
      <ArticleStatistics />
      {isLoading ? <p>Getting articles....</p> : tableComponent}
    </div>
  );
};

export default ManageArticlesPage;
