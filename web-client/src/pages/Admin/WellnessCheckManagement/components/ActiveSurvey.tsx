import moment from "moment";
import { useGetActiveSurveyQuery } from "../../../../services/surveyQuery";
import { TbProgress, TbInputCheck } from "react-icons/tb";

const ActiveSurvey = () => {
  const { data: surveyData, isLoading, error } = useGetActiveSurveyQuery();

  const totalResponse =
    surveyData && surveyData.affected.length + surveyData.unaffected.length;

  if (isLoading) {
    return <p>Loading active alert...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="w-max p-5  bg-white rounded-md shadow-md">
      <div className="flex flex-row gap-10">
        <div className="flex flex-row items-start gap-3 text-sm">
          <div className="bg-blue-100 p-2 rounded-md">
            <span>
              <TbProgress className="text-lg text-blue-400" />
            </span>
          </div>
          <div>
            <div>
              <p className=" text-gray-500">Ongoing Survey</p>
              <p className="text-lg text-blue-500 font-bold">
                {surveyData?.title}
              </p>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">Posted: </span>
              <span className="">
                {moment(surveyData?.startDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 text-sm">
          <div className="bg-green-100 p-2 rounded-md">
            <span>
              <TbInputCheck className="text-lg text-green-400" />
            </span>
          </div>
          <div>
            <div>
              <p className=" text-gray-500">Responses</p>
              <p className="text-xl font-bold">{totalResponse}</p>
            </div>
          </div>
        </div>
      </div>
      {/* {surveyData?._id && (
        <>
          <div className="">Active Survey: </div>
          <div className="flex flex-wrap xl:justify-between lg:justify-between md:justify-between gap-5 p-7 bg-yellow-200 rounded-xl">
            <div className="">
              <div className="text-sm text-gray-500">Survey ID</div>
              <div className="">{surveyData?.title}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-500">Date Published</div>
              <div className="">
                {moment(surveyData?.startDate).format("MMM DD, YYYY")} to{" "}
                {moment(surveyData?.endDate).format("MMM DD, YYYY")}
              </div>
            </div>
            <div className=" ">
              <div className="text-sm text-gray-500">Responses</div>
              <div className="">
                {surveyData?.affected.length + surveyData?.unaffected.length}
              </div>
            </div>
            <div className=" ">
              <div className="text-sm text-gray-500">Affected</div>
              <div className="">{surveyData?.affected.length}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-500">Unaffected</div>
              <div className="">{surveyData?.unaffected.length}</div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default ActiveSurvey;
