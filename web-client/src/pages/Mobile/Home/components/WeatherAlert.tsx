import { TSignalResData, TWeatherResData } from "../../../../types/alert";

import typhoon_icon from "../../../../assets/img/typhoon_icon.png";
import moment from "moment";
import Lightbox from "../../../../components/Lightbox/Lightbox";

type TProps = {
  signalAlertData: TSignalResData;
  weatherAlertData: TWeatherResData;
};
const WeatherAlert = ({ signalAlertData, weatherAlertData }: TProps) => {
  return (
    <>
      {signalAlertData.success &&
      weatherAlertData.success &&
      signalAlertData.signal != 0 ? (
        <>
          <Lightbox mediaURL={signalAlertData?.track} isImage={true}>
            <div className="bg-[#FFD400] p-5 rounded-2xl my-2">
              <div className="flex items-start">
                <img src={typhoon_icon} className="w-10 h-10 mr-3" />
                <div className="text-white">
                  <div className="font-bold text-xl">
                    {signalAlertData.category} "{signalAlertData.name}"
                  </div>
                  <div>
                    Malolos is under{" "}
                    <span className="text-secondary-500">
                      Signal #{signalAlertData?.signal}
                    </span>
                  </div>
                  <div className="text-sm">
                    as of{" "}
                    {moment(signalAlertData.updatedAt).format("MMM DD, YYYY")}
                  </div>
                  <div>
                    expect{" "}
                    {["a", "e", "i", "o", "u"].includes(
                      weatherAlertData.weather[0].toLowerCase()
                    )
                      ? "an "
                      : "a "}
                    <span className="font-bold">
                      {weatherAlertData.weather.replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                      )}{" "}
                    </span>
                    weather condition
                  </div>
                  <div className="text-[12px] mt-1">
                    the informationon on the typhoon were obtained from
                    pagasa.chlod.net
                  </div>
                </div>
              </div>
            </div>
          </Lightbox>
        </>
      ) : (
        weatherAlertData.success && (
          <div className="bg-[#FFD400] rounded-2xl my-2">
            <div className="flex items-center font-semibold">
              <img src={weatherAlertData.icon} className=" w-20 h-20" />
              <div>
                {weatherAlertData.weather.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default WeatherAlert;
