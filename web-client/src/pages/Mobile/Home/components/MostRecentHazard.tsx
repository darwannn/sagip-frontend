import { BASE_IMAGE_URL } from "../../../../api.config";
import { BsArrowRight } from "react-icons/bs";

import moment from "moment";

import { THazardReport } from "../../../../types/hazardReport";
import { User } from "../../../../types/user";

type TProps = {
  hazardReportData: THazardReport[];
  userData: User;
};

const MostRecentHazard = ({ hazardReportData, userData }: TProps) => {
  const userStreet = userData?.street;
  const filteredHazardReports = hazardReportData?.filter((report) => {
    return report.street === userStreet;
  });

  const mostRecentHazardReport = filteredHazardReports?.reduce(
    (prev, current) =>
      moment(current.createdAt).isAfter(prev.createdAt) ? current : prev,
    filteredHazardReports[0] || {}
  );

  return (
    <>
      {mostRecentHazardReport && filteredHazardReports?.length !== 0 && (
        <>
          <div className="font-bold text-xl text-[#293B95]">
            Reported hazards in {userData?.street}
          </div>
          <div className="bg-white  rounded-2xl p-5 border-2 border-[#FFD400] ">
            <div className="flex">
              <div className="h-[100px] w-[100px] mr-3">
                <img
                  src={`${BASE_IMAGE_URL}/hazard-report/${mostRecentHazardReport?.proof}`}
                  className="rounded-3xl w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="font-bold text-gray-800">
                  {mostRecentHazardReport?.category} on{" "}
                  {mostRecentHazardReport?.street}
                </div>
                <div className=" text-gray-600">
                  as of{" "}
                  {moment(mostRecentHazardReport.updatedAt).format(
                    " MMM DD, YYYY | hh:mm A"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-gray-600">
            <div className="flex-1">See more in your area</div>
            <BsArrowRight />
          </div>
        </>
      )}
    </>
  );
};

export default MostRecentHazard;
