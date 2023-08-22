import { BASE_IMAGE_URL } from "../../../api.config";
import { useGetActiveTeamsQuery } from "../../../services/teamQuery";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectAssistanceReq,
  setSelectedAssistanceRequest,
} from "../../../store/slices/assistanceReqSlice";
import Select from "react-select";
import moment from "moment";
import Modal from "../../../components/Modal/Modal";
// Icons
import { MdClose } from "react-icons/md";
import { useState } from "react";
import DismissAssistanceForm from "./DismissAssistanceForm";

const AssistanceDetails = () => {
  const assistanceReq = useAppSelector(selectAssistanceReq);
  const [isDismiss, setIsDismiss] = useState(false);
  const {
    data: rescueTeam,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetActiveTeamsQuery();

  // Get the names of the rescue team and put it in the select options
  const rescueTeamNames = rescueTeam?.map((team) => ({
    value: team._id,
    label: team.name,
  }));

  const dispatch = useAppDispatch();

  if (isLoading) console.log("Loading...");
  if (isError) console.log(error);
  if (isSuccess) console.log(rescueTeam);

  return (
    <>
      <div className="border rounded-md shadow-sm p-2 mx-2 h-[80vh]  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
        <div className="flex flex-col gap-2 h-full">
          <div className="w-full flex flex-row justify-between">
            <span>{assistanceReq?._id}</span>
            <button
              onClick={() => dispatch(setSelectedAssistanceRequest(null))}
              className="hover:bg-gray-200 p-1 rounded transition-all duration-100"
            >
              <MdClose />
            </button>
          </div>
          {/* USER DETAILS */}
          <div className="user-info flex flex-row items-center gap-2 p-2">
            <div className="pic-container">
              <img
                src={`${BASE_IMAGE_URL}/user/${assistanceReq?.userId.profilePicture}`}
                alt="user"
                className="rounded-full w-20 h-20"
              />
            </div>
            <div className="user-details grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-semibold">{`${assistanceReq?.userId.firstname} ${assistanceReq?.userId.lastname}`}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <p className="font-semibold">
                  {assistanceReq?.userId.contactNumber}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-500">Address:</span>
                <p>{`${assistanceReq?.userId.street} ${assistanceReq?.street} ${assistanceReq?.userId.municipality} ${assistanceReq?.userId.province}`}</p>
              </div>
            </div>
          </div>
          {/* EMERGENCY / ASSISTANCE DETAILS */}
          <div className="emergency-details bg-red-100 p-2 rounded-md">
            <div className="flex flex-row items-center gap-3">
              <div className="emergency-icon">
                <div className="bg-red-300 w-20 h-20 rounded-full"></div>
              </div>
              <div className="emergency-details grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <h3 className="font-bold text-xl text-red-500">Trapped</h3>
                </div>
                <div className="">
                  <span className="text-sm text-gray-500">Time Reported</span>
                  <p className="font-bold">
                    {moment(assistanceReq?.createdAt).format("HH:mm A")}
                  </p>
                </div>
                <div className="">
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-bold">{assistanceReq?.street}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* ADDITIONAL DETAILS */}
          <div className="additional-details bg-blue-200 p-2 flex-grow rounded-md">
            <span className="text-sm text-gray-500">Additional Details</span>
            <div className="image-container max-h-[200px] overflow-hidden">
              <img
                src={`${BASE_IMAGE_URL}/assistance-request/${assistanceReq?.proof}`}
                alt="proof image"
                className="w-[200px] object-cover"
              />
            </div>
            <p>{assistanceReq?.description}</p>
          </div>
          {/* EMERGENCY ACTION */}
          <div className="emergency-action p-2">
            <span>Emergency Action</span>
            <Select options={rescueTeamNames} />
            <div className="flex flex-row justify-end mt-5 gap-2">
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md"
                onClick={() => setIsDismiss(true)}
              >
                Dismiss
              </button>
              <button className="bg-green-500 text-white px-3 py-2 rounded-md">
                Send Rescue
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        modalShow={isDismiss}
        modalClose={() => setIsDismiss(false)}
        modalTitle="Dismiss Report"
      >
        <DismissAssistanceForm
          assistanceId={assistanceReq?._id || ""}
          closeModal={() => setIsDismiss(false)}
        />
      </Modal>
    </>
  );
};

export default AssistanceDetails;
