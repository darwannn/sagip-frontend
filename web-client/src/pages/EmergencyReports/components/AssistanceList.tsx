import { memo } from "react";
import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import AssistanceItem from "./AssistanceItem";
import { useSearchParams } from "react-router-dom";
const AssistanceList = memo(() => {
  const { data } = useGetAllAssistanceRequestsQuery();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "unverified";

  const filteredAssistance = data?.filter(
    (assistance) => assistance.status === filter
  );

  return (
    <div className="flex-grow flex flex-col gap-2 w-full overflow-x-auto">
      {filteredAssistance?.map((assistance) => (
        <AssistanceItem key={assistance._id} assistance={assistance} />
      ))}
      {filteredAssistance?.length === 0 && (
        <div className="text-center p-5 text-gray-500">No Assistance Found</div>
      )}
    </div>
  );
});

export default AssistanceList;
