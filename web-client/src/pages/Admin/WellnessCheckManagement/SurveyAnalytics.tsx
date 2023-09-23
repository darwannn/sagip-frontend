import {
  useGetActiveSurveyQuery,
  useGetSurveyQuery,
} from "../../../services/surveyQuery";
import ActiveSurvey from "./components/ActiveSurvey";
import { LoaderSpin } from "../../../components/Loader/Loader";
import { useEffect, useState } from "react";

import { TbInputCheck } from "react-icons/tb";
import { PiNewspaperClipping } from "react-icons/pi";

const SurveyAnalytics = () => {
  const {
    data: surveyData,
    isLoading,
    // isError,
    // error,
  } = useGetSurveyQuery(undefined);

  const {
    data: activeSurveyData,
    isSuccess: activeSuccess,
    isError: activeError,
  } = useGetActiveSurveyQuery();

  const [averageResponse, setAverageResponse] = useState<number>(0);

  useEffect(() => {
    if (surveyData) {
      // Compute the average response for the last 5 surveys
      const last5Surveys = surveyData.slice(0, 5);
      const totalResponse = last5Surveys.reduce((acc, curr) => {
        return acc + curr.affected.length + curr.unaffected.length;
      }, 0);
      setAverageResponse(totalResponse / 5);
    }
  }, [surveyData]);

  if (activeError) {
    console.log("Error fetching active survey data");
  }

  // const activeLoadingComp = (
  //   <div className="flex flex-row items-center gap-3 bg-gray-200 shadow p-6 rounded-md animate-pulse">
  //     <LoaderSpin className="text-xl" />
  //     <p className="text-sm text-gray-500">Checking for active alert ...</p>
  //   </div>
  // );

  return (
    <div className="flex flex-row flex-wrap gap-4 mb-8">
      {activeSuccess && activeSurveyData?.success ? (
        <ActiveSurvey surveyData={activeSurveyData} />
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-between items-start p-6 xl:w-[250px] bg-white rounded-md shadow">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Survey Created</span>
          <h3 className="text-2xl font-bold">
            {isLoading ? <LoaderSpin /> : surveyData?.length}
          </h3>
        </div>
        <div className="bg-blue-100 p-2 rounded">
          <PiNewspaperClipping className="text-blue-500 text-lg " />
        </div>
      </div>
      <div className="flex flex-row justify-between items-start p-6 xl:w-[250px] bg-white rounded-md shadow">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Average Response</span>
          <h3 className="text-2xl font-bold">
            {isLoading ? <LoaderSpin /> : averageResponse.toFixed(2)}
          </h3>
          <span className="text-xs text-gray-500">Last 5 Surveys</span>
        </div>
        <div className="bg-violet-100 p-2 rounded">
          <TbInputCheck className="text-violet-500 text-lg " />
        </div>
      </div>
    </div>
  );
};

export default SurveyAnalytics;
