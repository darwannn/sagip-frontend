import { TSignalResData, TWeatherResData } from "../../../../types/alert";

import typhoon_icon from "../../../../assets/img/typhoon_icon.png";

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
        <div className="bg-[#FFD400] p-5 rounded-2xl my-2">
          <div className="flex items-start">
            <img src={typhoon_icon} className="w-10 h-10 mr-3" />
            <div className="text-white">
              <div className="font-bold text-xl">
                {signalAlertData.category} "{signalAlertData.name}"
              </div>
              <div>
                Malolos is under{" "}
                <span className="text-[#C92A2A]">
                  Signal #{signalAlertData?.signal}
                </span>
              </div>
              <div className="text-sm">as of {signalAlertData.updatedAt}</div>
              <div>
                expect a{" "}
                <span className="font-bold">
                  {weatherAlertData.weather.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}{" "}
                </span>
                weather condition
              </div>
            </div>
          </div>
        </div>
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
