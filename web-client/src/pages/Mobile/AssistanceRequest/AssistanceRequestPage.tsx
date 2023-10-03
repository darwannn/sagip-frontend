import { useGetMyAssistanceRequestQuery } from "../../../services/assistanceRequestQuery";

import AssistanceMap from "./components/AssistanceMap";

const AssistanceRequestPage = () => {
  const {
    data: myAssistanceRequest,
    isError: assistanceIsError,
    isLoading: assistanceIsLoading,
  } = useGetMyAssistanceRequestQuery();

  if (assistanceIsLoading) return <div>Loading...</div>;
  if (assistanceIsError) console.log("Error");

  return (
    <>
      {myAssistanceRequest && (
        <AssistanceMap myAssistanceRequest={myAssistanceRequest} />
      )}
    </>
  );
};

export default AssistanceRequestPage;
