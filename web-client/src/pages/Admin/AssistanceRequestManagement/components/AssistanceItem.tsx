import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import { TbFlagSearch } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";
import { formatAsstReqDate } from "../../../../util/date";
import EmergencyStatusBadge from "../../../../components/Badges/EmergencyStatusBadge";

type AssistanceItemProps = {
  assistance: TAssistanceRequest;
};

const AssistanceItem: React.FC<AssistanceItemProps> = ({ assistance }) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedAssistanceRequest(assistance));
  };

  const status = assistance.status === "unverified" ? "New" : assistance.status;

  return (
    <div
      className="text-sm flex flex-col border rounded-md cursor-pointer bg-white hover:shadow-md hover:translate-x-1 transition-all duration-100 "
      onClick={() => handleOnClick()}
    >
      <div
        className={`border-b p-2 border-l-4  text-gray-700 font-semibold ${
          status === "New" ? "border-l-red-500" : ""
        }`}
      >
        <TbFlagSearch className="inline  text-lg mr-1" />
        <span className="text-sm">Trapped</span>
      </div>
      <div className="emergency-info-container p-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{assistance._id}</span>
            <EmergencyStatusBadge variant={assistance?.status}>
              {assistance?.status}
            </EmergencyStatusBadge>
          </div>
          <div className="">
            <p className="font-semibold text-gray-500">Time Reported</p>
            <span className="">{formatAsstReqDate(assistance.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="location-info-container p-2 border-t">
        <span className="flex items-center">
          <MdLocationOn className="text-gray-500 inline mr-1" />
          {`${assistance.street}, ${assistance.municipality}`}
        </span>
      </div>
    </div>
  );
};

export default AssistanceItem;
