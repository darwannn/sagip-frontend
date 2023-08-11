import { useGetAllAssistanceRequestsQuery } from "../../../services/assistanceRequestQuery";
import AssistanceItem from "./AssistanceItem";
const AssistanceList = () => {
  const { data } = useGetAllAssistanceRequestsQuery();

  return (
    <div className="flex flex-col gap-2 bg-white p-3 max-h-[70vh] min-w-[350px] shadow border rounded-md overflow-x-auto">
      {data?.map((assistance) => (
        <AssistanceItem key={assistance._id} assistance={assistance} />
      ))}
    </div>
  );
};

export default AssistanceList;
