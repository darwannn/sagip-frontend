import type { TAssistanceRequest } from "../../../../types/assistanceRequest";
import AssistanceItem from "./AssistanceItem";

type TProps = {
  assistanceReq: TAssistanceRequest[] | undefined;
};

const VerifyUserList = ({ assistanceReq }: TProps) => {
  return (
    <>
      <div className="flex flex-col gap-3  mx-5">
        {assistanceReq?.length != 0 ? (
          assistanceReq?.map((article, index) => (
            <AssistanceItem key={index} assistanceReq={article} />
          ))
        ) : (
          <p className="text-center">
            There is currently no assistance request assigned to your team.
          </p>
        )}
      </div>
    </>
  );
};

export default VerifyUserList;
