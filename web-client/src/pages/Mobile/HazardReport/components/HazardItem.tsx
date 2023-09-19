import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";

import {
  setSelectedHazardReport,
  setSelectedHazard,
} from "../../../../store/slices/hazardReportSlice";
import type { THazardReport } from "../../../../types/hazardReport";

import { BASE_IMAGE_URL } from "../../../../api.config";

import moment from "moment";

type TProps = {
  hazard: THazardReport;
};

const HazardItem = ({ hazard }: TProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Link
        to="/hazard-map"
        onClick={() => {
          dispatch(setSelectedHazardReport(hazard));
          dispatch(setSelectedHazard("hazard"));
        }}
      >
        <div className="bg-white  rounded-2xl p-3 shadow-md">
          <div className="flex">
            <div className="h-[100px] w-[100px] mr-3">
              <img
                src={`${BASE_IMAGE_URL}/hazard-report/${hazard?.proof}`}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>

            <div className="my-auto">
              <span>{hazard?.category} on </span>
              <span className="font-bold text-gray-800">
                {hazard?.street} {hazard?.street !== "" && "Street"}
              </span>
              <div className=" text-gray-600">
                {/* as of{" "} */}
                {moment(hazard.updatedAt).format(" MMM DD, YYYY | hh:mm A")}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HazardItem;
