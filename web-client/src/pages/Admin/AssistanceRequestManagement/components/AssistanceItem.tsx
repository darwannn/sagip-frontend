import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import { TbFlagSearch } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";
import { formatAsstReqDate } from "../../../../util/date";
import { Badge } from "../../../../components/ui/Badge";

type AssistanceItemProps = {
  assistance: TAssistanceRequest;
};

const AssistanceItem: React.FC<AssistanceItemProps> = ({ assistance }) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedAssistanceRequest(assistance));
  };

  return (
    <div
      className="text-sm flex flex-col border rounded-md cursor-pointer bg-white hover:shadow-md hover:translate-x-1 transition-all duration-100 "
      onClick={() => handleOnClick()}
    >
      <div className="border-b p-2 border-l-4 border-l-red-500 text-gray-700 font-semibold">
        {/* <span className="text-gray-500 text-xs">{assistance._id}</span> */}
        <TbFlagSearch className="inline  text-lg mr-1" />
        <span className="text-sm">Trapped</span>
      </div>
      <div className="emergency-info-container p-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{assistance._id}</span>
            <Badge className="w-max bg-gray-500 rounded-md capitalize">
              {assistance.status}
            </Badge>
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
