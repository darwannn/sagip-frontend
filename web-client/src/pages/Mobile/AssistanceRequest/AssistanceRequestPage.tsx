import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setDisplayedAssistancePage,
  setSelectedAssistanceRequest,
} from "../../../store/slices/assistanceReqSlice";
import { useGetMyAssistanceRequestQuery } from "../../../services/assistanceRequestQuery";

import AssistanceDetails from "./components/AssistanceDetails";
import AssistanceForm from "./components/AssistanceForm";
import HelpMeButton from "./components/HelpMeButton";
/* import AssistanceQuestionOne from "./components/AssistanceQuestionOne";
import AssistanceQuestionTwo from "./components/AssistanceQuestionTwo";
import AssistanceQuestionThree from "./components/AssistanceQuestionThree"; */

const AssistanceRequestPage = () => {
  const dispatch = useAppDispatch();

  const displayedAssistancePage = useAppSelector(
    (state) => state.assistanceReq.displayedAssistancePage
  );

  const {
    data: assistanceData,
    isError: assistanceIsError,
    isLoading: assistanceIsLoading,
  } = useGetMyAssistanceRequestQuery();
  /*  console.log(assistanceData); */
  useEffect(() => {
    if (assistanceData) {
      dispatch(setSelectedAssistanceRequest(assistanceData));
    } else {
      dispatch(setDisplayedAssistancePage("button"));
    }
  }, [dispatch, assistanceData]);

  if (assistanceIsLoading) return <div>Loading...</div>;
  if (assistanceIsError) console.log("Error");

  return (
    <>
      {assistanceData?.success ? (
        <AssistanceDetails />
      ) : (
        <>
          {displayedAssistancePage === "button" &&
          assistanceData?.success === false ? (
            <HelpMeButton />
          ) : (
            <AssistanceForm />
          )}
        </>
      )}
    </>
  );
};

export default AssistanceRequestPage;
