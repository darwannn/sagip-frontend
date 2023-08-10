import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
// React Icons
import { TbTextCaption } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import moment from "moment";
const AssistanceList = () => {
  const { data } = useGetAllAssistanceRequestsQuery();

  return (
    <div className="flex flex-col gap-2 bg-white p-3 max-h-[70vh] min-w-[350px] shadow border rounded-md overflow-x-auto">
      {data?.map((assistance) => (
        <div key={assistance._id} className="flex flex-col border rounded">
          <div className="id-container border-b p-2">
            <span className="text-gray-500 text-xs">{assistance._id}</span>
          </div>
          <div className="emergency-info-container mt-2 p-2">
            <div className="flex flex-col">
              <span className="font-semibold text-md">Trapped</span>
              {/* Extract the time */}
              <span className="text-sm">
                {moment(assistance.createdAt).format("llll")}
              </span>
            </div>
            <div className="description mt-2">
              <span className="">
                <TbTextCaption className="inline text-gray-500 text-lg mr-1" />
                {assistance.description}
              </span>
            </div>
          </div>
          <div className="location-info-container p-2 border-t">
            <span>
              <MdLocationOn className="text-gray-500 inline" />
              {assistance.street}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssistanceList;
