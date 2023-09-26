import { BASE_IMAGE_URL } from "../../../../api.config";
import { useGetActiveTeamsQuery } from "../../../../services/teamQuery";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectAssistanceReq,
  setSelectedAssistanceRequest,
} from "../../../../store/slices/assistanceReqSlice";
import Modal from "../../../../components/Modal/Modal";
// Icons
import { MdClose } from "react-icons/md";
import { useState } from "react";
import DismissAssistanceForm from "./DismissAssistanceForm";
import { Badge } from "../../../../components/ui/Badge";
import { TbFlagSearch } from "react-icons/tb";
import { formatAsstReqDate } from "../../../../util/date";

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
  // const rescueTeamNames = rescueTeam?.map((team) => ({
  //   value: team._id,
  //   label: team.name,
  // }));

  const dispatch = useAppDispatch();

  if (isLoading) console.log("Loading...");
  if (isError) console.log(error);
  if (isSuccess) console.log(rescueTeam);

  return (
    <>
      <div className="rounded-md shadow-md p-5 mx-2 h-[90vh] bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[400px] max-w-[500px]">
        <div className="flex flex-row justify-between">
          <span className="font-bold text-xl text-red-500">Review Request</span>
          <button
            onClick={() => dispatch(setSelectedAssistanceRequest(null))}
            className="hover:bg-gray-200 p-1 rounded transition-all duration-100"
          >
            <MdClose />
          </button>
        </div>
        <hr className="my-5" />
        {/* User Information */}
        <p className="font-semibold">Reporter Information</p>
        <div className="flex flex-row items-center bg-slate-100 p-3 gap-5 rounded">
          <div className="pic-container">
            <img
              src={`${BASE_IMAGE_URL}/user/${assistanceReq?.userId.profilePicture}`}
              alt="user"
              className="rounded-full w-14 h-14"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-row flex-wrap gap-5">
              <div>
                <span className="text-xs font-semibold text-gray-500">
                  Full Name:
                </span>
                <p>
                  {`${assistanceReq?.userId.firstname} ${assistanceReq?.userId.lastname}`}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500">
                  Contact Number:
                </span>
                <p>{assistanceReq?.userId.contactNumber}</p>
              </div>
            </div>
            <div>
              <Badge className="bg-blue-500 text-white capitalize rounded">
                {assistanceReq?.userId.status}
              </Badge>
            </div>
          </div>
        </div>
        {/* Emergency Details */}
        <p className="font-semibold mt-5">Emergency Details</p>
        <div className="emergency-details bg-slate-100 p-2 rounded-md">
          <div className="flex flex-row justify-between">
            <div className="emergency-icon flex items-center gap-2 mb-2">
              <div className="bg-red-100 p-2 rounded flex items-center justify-center">
                <TbFlagSearch className="text-red-500 text-md" />
              </div>
              <div className="">
                <h3 className="font-semibold text-red-500">Trapped</h3>
              </div>
            </div>
            <div>
              <span className="text-xs">{assistanceReq?._id}</span>
            </div>
          </div>
          <div className="emergency-details grid grid-cols-2 gap-3">
            <div className="">
              <span className="text-xs font-semibold text-gray-500">
                Time Reported
              </span>
              <p className="text-sm">
                {formatAsstReqDate(assistanceReq?.createdAt)}
              </p>
            </div>
            <div className="">
              <span className="text-xs font-semibold text-gray-500">
                Location
              </span>
              <p className="text-sm">{assistanceReq?.street}</p>
            </div>
          </div>
          <div className="mt-5 text-sm">
            <div className="h-[200px] max-h-[250px] border-2 rounded">
              {assistanceReq?.proof ? (
                <img
                  src={`${BASE_IMAGE_URL}/assistance-request/${assistanceReq?.proof}`}
                  alt="IMAGE"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">No Image Attached</p>
                </div>
              )}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-500">
                Additional Details
              </span>
              <div className="border-2 p-2 h-[100px] rounded">
                {assistanceReq?.description ? (
                  <p>{assistanceReq?.description}</p>
                ) : (
                  <p className="text-gray-500">No Description</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 mt-8 justify-end">
          <button className="btn-secondary" onClick={() => setIsDismiss(true)}>
            Reject
          </button>
          <button type="button" className="btn-primary">
            Accept Request
          </button>
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
