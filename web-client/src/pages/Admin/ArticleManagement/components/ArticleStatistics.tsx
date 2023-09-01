// Services
import { useGetStatisticsQuery } from "../../../../services/accountQuery";
// Icons
import { RiFileUploadFill } from "react-icons/ri";
import { MdArticle } from "react-icons/md";

import SingleData from "../../../../components/Statistics/SingleData";

const ArticleStatistics = () => {
  const {
    data: statisticsData,
    /* isLoading: statisticsLoading, */
    error: statisticsError,
  } = useGetStatisticsQuery();

  if (statisticsError) return <div>Something went wrong</div>;

  return (
    <>
      <div className="statistics flex flex-row h-52 m-5 gap-4">
        <SingleData
          title="Total Articles"
          value={statisticsData?.articles}
          icon={<MdArticle />}
          isPrimary={true}
          isThisMonth={false}
          navigateTo="/"
          style="article"
        />

        <SingleData
          title="Published Articles"
          value={statisticsData?.publishedArticles}
          icon={<RiFileUploadFill />}
          isPrimary={false}
          isThisMonth={false}
          navigateTo="/"
          style="article"
        />
      </div>
    </>
  );
};

export default ArticleStatistics;
