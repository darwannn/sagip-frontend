// TODO: Create a redux slice for article management state / data

// Redux
// Services
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
    <>
      <h1>Manage Articles Page</h1>
      {isLoading ? <p>Getting articles....</p> : tableComponent}
    </>
  );
};

export default ManageArticlesPage;
