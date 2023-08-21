import { memo } from "react";
import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import AssistanceItem from "./AssistanceItem";
const AssistanceList = memo(() => {
  const { data } = useGetAllAssistanceRequestsQuery();

  return (
    <div className="flex-grow flex flex-col gap-2 w-full overflow-x-auto">
      {data?.map((assistance) => (
        <AssistanceItem key={assistance._id} assistance={assistance} />
      ))}
    </div>
  );
});

export default AssistanceList;
