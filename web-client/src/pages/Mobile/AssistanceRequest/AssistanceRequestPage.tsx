import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setDisplayedAssistancePage,
  setSelectedAssistanceRequest,
} from "../../../store/slices/assistanceReqSlice";
import { useGetMyAssistanceRequestQuery } from "../../../services/assistanceRequestQuery";

import AssistanceDetails from "./components/AssistanceDetails";
import AssistanceForm from "./components/AssistanceForm";

import { useNavigate } from "react-router-dom";
import UnfinishedReport from "./components/UnfinishedReport";
import Modal from "../../../components/Modal/Modal";

const AssistanceRequestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const displayedAssistancePage = useAppSelector(
    (state) => state.assistanceReq.displayedAssistancePage
  );

  const {
    data: assistanceData,
    isError: assistanceIsError,
    isLoading: assistanceIsLoading,
    /*  refetch: refetchAssistanceData, */
  } = useGetMyAssistanceRequestQuery();

  useEffect(() => {
    if (!assistanceIsLoading) {
      if (assistanceData?._id) {
        dispatch(setSelectedAssistanceRequest(assistanceData));
        dispatch(setDisplayedAssistancePage("myrequest"));
      } else {
        dispatch(setDisplayedAssistancePage("questionOne"));
      }
    }
  }, [dispatch, assistanceData, assistanceIsLoading, navigate]);

  if (assistanceIsLoading) return <div>Loading...</div>;
  if (assistanceIsError) console.log("Error");

  return (
    <>
      <AssistanceForm setShowModal={setShowModal} />
      {assistanceData?._id && displayedAssistancePage === "myrequest" && (
        <AssistanceDetails assistanceData={assistanceData} />
      )}

      <Modal
        isMobile={true}
        modalTitle={""}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <UnfinishedReport setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default AssistanceRequestPage;
