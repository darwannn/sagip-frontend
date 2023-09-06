import { Link } from "react-router-dom";
import {
  useGetSignalAlertQuery,
  useGetWeatherAlertQuery,
} from "../../../services/alertQuery";
import { useGetPublishedArticlesQuery } from "../../../services/articleQuery";
import { useGetCheckActiveSurveyQuery } from "../../../services/surveyQuery";
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
                <Link to="/notification">
                  <div className="relative cursor-pointer m-2">
                    {true && (
                      <div className=" w-2 h-2 bg-[#C92A2A] rounded-full absolute right-1"></div>
                    )}
                    <IoNotificationsOutline className="text-2xl" />
                  </div>
                </Link>
                <Link to="/account-settings">
                  <img
                    src={`${BASE_IMAGE_URL}/user/${userData?.profilePicture}`}
                    className="rounded-full w-10"
                  />
                </Link>
              </>
            )}
          </>
        }
      />
      <div className="flex flex-col px-5 mt-2">
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
        <div className="mt-5">
          {userData && hazardReportData && userData && (
            <>
              <div className="font-bold text-xl text-[#293B95] mb-2">
                Reported hazards in {userData?.street}
              </div>
              <MostRecentHazard
                hazardReportData={hazardReportData}
                userData={userData}
              />
            </>
          )}
        </div>
        <div className="mt-5">
          <div className="font-bold text-xl text-[#293B95] mb-2">
            Safety Tips
          </div>

          {articlesData && <SavedArticleList articleData={articlesData} />}
        </div>
      </div>
    </>
  );
};

export default Home;
