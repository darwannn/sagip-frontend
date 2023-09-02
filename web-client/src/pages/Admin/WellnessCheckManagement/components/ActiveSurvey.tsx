import moment from "moment";
import { useGetActiveSurveyQuery } from "../../../../services/surveyQuery";

const ActiveSurvey = () => {
  const { data: surveyData, isLoading, error } = useGetActiveSurveyQuery();

  if (isLoading) {
    return <p>Loading active alert...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="my-8">
      {surveyData?._id && (
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
      )}
    </div>
  );
};

export default ActiveSurvey;
