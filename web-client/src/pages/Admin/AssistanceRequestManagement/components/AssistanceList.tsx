import React, { memo } from "react";
import AssistanceItem from "./AssistanceItem";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";

type AssistanceListProps = {
  assistanceRequests: TAssistanceRequest[];
};

const AssistanceList: React.FC<AssistanceListProps> = memo(
  ({ assistanceRequests }) => {
    return (
      <div className="flex-1 flex flex-col gap-5 px-1 w-full overflow-y-auto">
        {assistanceRequests?.map((assistance) => (
          <AssistanceItem key={assistance._id} assistance={assistance} />
        ))}
        {assistanceRequests?.length === 0 && (
          <div className="text-center p-5 text-gray-500">
            No Assistance Found
          </div>
        )}
      </div>
    );
  }
);

export default AssistanceList;
