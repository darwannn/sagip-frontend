// TODO: Create a redux slice for article management state / data

// Redux
import { useAppDispatch } from "../../store/hooks";
// Services
import { useGetArticlesQuery } from "../../services/articleQuery";
import { useEffect } from "react";
import ArticleTable from "./ArticleTable";

const ManageArticlesPage = () => {
  const { data: articles, isLoading, error } = useGetArticlesQuery(undefined);

  useEffect(() => {
    if (articles) console.log(articles);
  }, [articles]);

  return (
    <>
      <h1>Manage Articles Page</h1>
      {isLoading ? (
        <p>Getting articles....</p>
      ) : (
        <ArticleTable data={articles || []} />
      )}
    </>
  );
};

export default ManageArticlesPage;
