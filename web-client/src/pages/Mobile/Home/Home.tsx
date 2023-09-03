import {
  useGetSignalAlertQuery,
  useGetWeatherAlertQuery,
} from "../../../services/alertQuery";
import { useGetPublishedArticlesQuery } from "../../../services/articleQuery";
import { useGetCheckActiveSurveyQuery } from "../../../services/alertQuery";
import { useGetUserByTokenQuery } from "../../../services/accountQuery";
import { useGetOngoingHazardQuery } from "../../../services/hazardReportsQuery";

import { BASE_IMAGE_URL } from "../../../api.config";

import SavedArticleList from "../Articles/components/CarouselArticleList";
import MobileHeader from "../../../components/MobileHeader/MobileHeader";
import WeatherAlert from "./components/WeatherAlert";
import WellnessSurvey from "./components/WellnessSurvey";

import EmergencyHotlines from "./components/EmergencyHotlines";
import MostRecentHazard from "./components/MostRecentHazard";

import { IoNotificationsOutline } from "react-icons/io5";
const Home = () => {
  const { data: userData } = useGetUserByTokenQuery();
  const { data: signalAlertData } = useGetSignalAlertQuery();
  const { data: weatherAlertData } = useGetWeatherAlertQuery();
  const { data: wellnessSurveyData } = useGetCheckActiveSurveyQuery();
  const { data: articlesData } = useGetPublishedArticlesQuery();
  /* const { data: savedArticleData } = useGetSavedArticlesQuery(); */
  const { data: hazardReportData } = useGetOngoingHazardQuery();
  console.log(userData);

  return (
    <>
      <MobileHeader
        component={
          <>
            <div className="font-bold text-4xl flex-1">SAGIP</div>
            {userData && (
              <>
                <div className="relative cursor-pointer m-2">
                  {true && (
                    <div className=" w-2 h-2 bg-[#C92A2A] rounded-full absolute right-1"></div>
                  )}
                  <IoNotificationsOutline className="text-2xl" />
                </div>
                <img
                  src={`${BASE_IMAGE_URL}/user/${userData?.profilePicture}`}
                  className="rounded-full w-10"
                />
              </>
            )}
          </>
        }
      />
      <div className="px-5">
        {weatherAlertData && signalAlertData && (
          <WeatherAlert
            weatherAlertData={weatherAlertData}
            signalAlertData={signalAlertData}
          />
        )}
        {userData && wellnessSurveyData && (
          <WellnessSurvey wellnessSurveyData={wellnessSurveyData} />
        )}
        <EmergencyHotlines />

        {userData && hazardReportData && userData && (
          <>
            <MostRecentHazard
              hazardReportData={hazardReportData}
              userData={userData}
            />
          </>
        )}
        <div className="font-bold text-xl text-[#293B95]">Safety Tips</div>

        {articlesData && <SavedArticleList articleData={articlesData} />}
      </div>
    </>
  );
};

export default Home;
