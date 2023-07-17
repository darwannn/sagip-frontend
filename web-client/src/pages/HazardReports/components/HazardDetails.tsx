import moment from "moment";
import type { THazardReport } from "../types/hazardReport";
import { BASE_IMAGE_URL } from "../../../api.config";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../../store/hooks";
import { unselectHazardReport } from "../../../store/slices/hazardReportSlice";
import { useDeleteHazardReportMutation } from "../../../services/hazardReportsQuery";

type TProps = {
  reportData: THazardReport;
};

const HazardDetails = ({ reportData }: TProps) => {
  const dispatch = useAppDispatch();

  const [deleteHazardReport, { isLoading: isDeleteLoading }] =
    useDeleteHazardReportMutation();

  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      <div className="flex flex-row justify-between items-center">
        <span className="text-gray-400 text-sm">
          Hazard ID: {reportData._id}
        </span>
        <button
          className="hover:bg-gray-300 rounded p-1 text-gray-500"
          onClick={() => {
            dispatch(unselectHazardReport());
          }}
        >
          <MdClose />
        </button>
      </div>
      {/* USER INFO */}
      <div className="flex flex-row items-center gap-2">
        <div className="img-container">
          <img
            src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            alt="user"
            className="rounded-full object-cover w-16 h-16"
          />
        </div>
        <div className="info-container">
          <span className="text-sm">Reported by:</span>
          <p>{`${reportData.userId.firstname} ${reportData.userId.lastname}`}</p>
          <span className="text-sm">Address:</span>
          <p>{reportData.userId.barangay}</p>
        </div>
      </div>
      {/* REPORT INFO */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="font-bold">{reportData.category}</p>
          <div className="">
            <span>Address:</span>
            <p>{reportData.street}</p>
            <span>Reported On:</span>
            <p>
              {moment(reportData.updatedAt).format("MMM DD, YYYY - ddd HH:mm")}
            </p>
            <span>Status:</span>
            <p>{reportData.status}</p>
          </div>
        </div>
        <div>
          <span className="text-gray-400">Additional Info:</span>
          <div className="group relative w-full h-52 border rounded-md">
            <img
              className="w-full h-full rounded object-cover"
              src={`${BASE_IMAGE_URL}/hazard-report/${reportData.proof}`}
              alt={reportData.category}
            />
          </div>
          <span>Description:</span>
          <p>{reportData.description}</p>
        </div>
      </div>
      {/* REPORT ACTION */}
      <div className="flex flex-col gap-2">
        <button className="bg-green-500 text-white rounded-md px-2 py-1">
          {reportData.status === "verified" ? "Mark as Resolved" : "Verify"}
        </button>
        <button
          className="bg-red-300 text-white rounded-md px-2 py-1"
          onClick={() => {
            dispatch(unselectHazardReport());
            deleteHazardReport(reportData._id);
          }}
        >
          {isDeleteLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default HazardDetails;
