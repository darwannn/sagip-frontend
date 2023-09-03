import ArticleItem from "./ArticleItem";

import type { Article } from "../../../../types/article";

type TProps = {
  articleData: Article[];
};

const ArticleList = ({ articleData }: TProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        {articleData.length != 0 ? (
          articleData.map((article, index) => (
            <ArticleItem key={index} articleData={article} />
          ))
        ) : (
          <p className="text-center">No Results</p>
        )}
      </div>
    </>
  );
};

export default ArticleList;
