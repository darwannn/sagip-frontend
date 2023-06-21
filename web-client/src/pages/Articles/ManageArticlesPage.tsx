// TODO: Create a redux slice for article management state / data

// Redux
import { useAppDispatch } from "../../store/hooks";
import { setArticles } from "../../store/slices/articleSlice";
// Services
import { useGetArticlesQuery } from "../../services/articleQuery";
import { useEffect } from "react";
import ArticleTable from "./components/ArticleTable";

const ManageArticlesPage = () => {
  const dispatch = useAppDispatch();
  const { data: articles, isLoading, error } = useGetArticlesQuery(undefined);

  useEffect(() => {
    if (articles) {
      dispatch(setArticles(articles));
    }
  }, [articles, dispatch]);

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <h1>Manage Articles Page</h1>
      {isLoading ? <p>Getting articles....</p> : <ArticleTable />}
    </>
  );
};

export default ManageArticlesPage;
