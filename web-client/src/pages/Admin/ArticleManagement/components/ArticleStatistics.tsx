// Services
import { useGetStatisticsQuery } from "../../../../services/accountQuery";
// Icons
import { HiOutlineNewspaper } from "react-icons/hi";
import { TbUpload } from "react-icons/tb";
import { BiLoaderAlt } from "react-icons/bi";

const ArticleStatistics = () => {
  const {
    data: statisticsData,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useGetStatisticsQuery();

  if (statisticsError) return <div>Something went wrong</div>;

  const loader = <BiLoaderAlt className="animate-spin" />;

  return (
    <>
      <div className="my-5 flex flex-row gap-3">
        <div className="flex flex-col gap-2 p-6 xl:w-[250px] bg-blue-100 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm">Total Articles</span>
            <HiOutlineNewspaper className="text-lg" />
          </div>
          <h3 className="text-2xl font-bold">
            {statisticsLoading ? loader : statisticsData?.articles}
          </h3>
        </div>
        <div className="flex flex-col gap-2 border p-6 xl:w-[250px] bg-gray-100 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm">Published Articles</span>
            <TbUpload className="text-lg" />
          </div>
          <h3 className="text-2xl font-bold">
            {statisticsLoading ? loader : statisticsData?.publishedArticles}
          </h3>
        </div>
      </div>
    </>
  );
};

export default ArticleStatistics;
