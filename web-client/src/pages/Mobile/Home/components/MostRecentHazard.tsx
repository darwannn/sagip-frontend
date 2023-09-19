import { Link } from "react-router-dom";
/* import { BASE_IMAGE_URL } from "../../../../api.config"; */
import { BsArrowRight } from "react-icons/bs";

import moment from "moment";

import { THazardReport } from "../../../../types/hazardReport";
import { User } from "../../../../types/user";
import HazardItem from "../../HazardReport/components/HazardItem";

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
          <div className="font-bold text-xl text-primary-600 mb-2">
            Reported hazards in {userData?.street}
          </div>

          <div className="rounded-2xl border-2 border-[#FFD400] ">
            <HazardItem
              hazardData={mostRecentHazardReport}
              isMyReport={false}
            />
          </div>
          <Link to="/hazard-reports">
            <div className="flex text-gray-600 mt-1">
              <div className="flex-1">See more in your area</div>
              <BsArrowRight />
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default MostRecentHazard;
