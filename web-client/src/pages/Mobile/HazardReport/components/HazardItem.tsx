import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";

import { BASE_IMAGE_URL, BASE_VIDEO_URL } from "../../../../api.config";
import {
  setSelectedHazardReport,
  setSelectedHazard,
} from "../../../../store/slices/hazardReportSlice";
import type { THazardReport } from "../../../../types/hazardReport";

import moment from "moment";

import ItemActionButton from "./ItemActionButton";

type TProps = {
  hazardData: THazardReport;
  isMyReport: boolean;
};

const HazardItem = ({ hazardData, isMyReport }: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white  rounded-2xl p-3 shadow-md relative">
        <ItemActionButton hazardData={hazardData} />
        <div className="flex">
          <div className="h-[100px] w-[100px] mr-3">
            {["jpeg", "jpg", "png"].some((extension) =>
              hazardData.proof.includes(extension)
            ) ? (
              <img
                src={`${BASE_IMAGE_URL}/hazard-report/${hazardData?.proof}`}
                className="rounded-2xl w-full h-full object-cover"
              />
            ) : (
              <video
                src={`${BASE_VIDEO_URL}/hazard-report/${hazardData?.proof}`}
                className="rounded-2xl w-full h-full object-cover"
              />
            )}
          </div>

          <div className="my-auto">
            <div
              className="hover:text-primary-600 hover:cursor-pointer"
              onClick={() => {
                dispatch(setSelectedHazardReport(hazardData));
                if (isMyReport) {
                  navigate(`/hazard-reports/edit/${hazardData._id}`);
                } else {
                  navigate("/hazard-map");
                  dispatch(setSelectedHazard("hazard"));
                }
              }}
            >
              <span>{hazardData?.category} </span>
              {hazardData?.street !== "" && (
                <>
                  <span>on </span>

                  <span className="font-semibold ">
                    {hazardData?.street} Street
                  </span>
                </>
              )}
            </div>
            <div className=" text-gray-600">
              {moment(hazardData.updatedAt).format(" MMM DD, YYYY | hh:mm A")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HazardItem;
