import { useState } from "react";
import { BASE_IMAGE_URL } from "../../../../api.config";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import type { Token } from "../../../../types/auth";
import {
  selectAssistanceReq,
  setSelectedAssistanceRequest,
} from "../../../../store/slices/assistanceReqSlice";

import { useGetActiveTeamsQuery } from "../../../../services/teamQuery";
import {
  useGetToRespondAssistanceRequestsQuery,
  useUpdateAssistanceRequestMutation,
} from "../../../../services/assistanceRequestQuery";

import jwtDecode from "jwt-decode";
import { BiSolidNotepad } from "react-icons/bi";
import { FaDirections } from "react-icons/fa";

const AssistanceDetails = () => {
  const assistanceReq = useAppSelector(selectAssistanceReq);
  const [isBeingResponded, setIsBeingResponded] = useState<boolean>(false);

  const { data: assistanceReqs } = useGetToRespondAssistanceRequestsQuery();
  const [
    update,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateAssistanceRequestMutation();
  const {
    data: rescueTeam,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetActiveTeamsQuery();

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<Token>(token || "");

  const beingRespondedCount =
    assistanceReqs?.filter((request) => {
      return (
        request.isBeingResponded === true && request._id !== assistanceReq?._id
      );
    })?.length || 0;

  console.log("beingRespondedCount", beingRespondedCount);
  const respond = async () => {
    if (window.AndroidInterface?.isLocationEnabled("responder")) {
      const res = await update({
        action: "respond",
        id: assistanceReq?._id || "",
      });
      if ("data" in res) {
        setIsBeingResponded(true);
        if (
          assistanceReq?.assignedTeam?.head._id === decodedToken.id &&
          token
        ) {
          window.AndroidInterface?.startSharingLocation(
            token,
            assistanceReq.userId._id,
            assistanceReq._id
          );
        }
      }
    }
  };
  const resolve = async () => {
    const res = await update({
      action: "resolve",
      id: assistanceReq?._id || "",
    });
    if ("data" in res) {
      dispatch(setSelectedAssistanceRequest(null));
      // if (assistanceReq?.assignedTeam?.head._id === decodedToken.id && token) {
      window.AndroidInterface?.stopSharingLocation();
      // }
    }
  };
  if (isLoading) console.log("Loading...");
  if (isError) console.log(error);
  if (isSuccess) console.log(rescueTeam);

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error Updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <>
      <div className=" bg-primary-50  px-5 pb-3 ">
        {/* should open google maps using android intent on click */}
        <FaDirections
          className="text-2xl absolute right-8 top-0 text-primary-600 cursor-pointer"
          onClick={() => {
            window.AndroidInterface?.routeTo(
              assistanceReq?.latitude || 0,
              assistanceReq?.longitude || 0
            );
          }}
        />
        <div className="flex flex-row items-center gap-5">
          <div className="icon w-16 h-16  bg-secondary-500 rounded-full"></div>

          <div>
            <h3 className="font-bold text-2xl text-secondary-500">
              {assistanceReq?.category}
            </h3>

            <div className="flex gap-2 ">
              <div>
                <span className="text-sm text-gray-500 ">Longitude</span>
                <p className=" text-sm w-28 sm:w-44 truncate">
                  {assistanceReq?.longitude}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Latitude</span>
                <p className=" text-sm w-28 sm:w-44 truncate">
                  {assistanceReq?.latitude}
                </p>
              </div>
            </div>
          </div>
        </div>

        <span className="text-sm text-gray-500">Address:</span>
        <p>{`${assistanceReq?.userId.street} ${assistanceReq?.street} Sreet, Malolos, Bulacan`}</p>

        {/* RESOLVE*/}

        <button
          className="bg-primary-400 text-white  py-2 my-3 rounded-md w-full disabled:bg-primary-300"
          disabled={beingRespondedCount > 0 ? true : false}
          onClick={() => {
            (assistanceReq && assistanceReq.isBeingResponded) ||
            isBeingResponded
              ? resolve()
              : respond();
          }}
        >
          {(assistanceReq && assistanceReq.isBeingResponded) || isBeingResponded
            ? "Resolve"
            : "Respond"}
        </button>
      </div>

      <div className="bg-white flex flex-row items-center gap-5 px-5 py-3 rounded-t-3xl ">
        <div className="pic-container">
          <img
            src={`${BASE_IMAGE_URL}/user/${assistanceReq?.userId.profilePicture}`}
            alt="user"
            className="rounded-full w-20 h-20"
          />
        </div>
        <div className=" flex-col flex-1">
          <div>
            <span className="text-sm text-gray-500 break-words">Name:</span>
            <p className="font-semibold text-800">{`${assistanceReq?.userId.firstname} ${assistanceReq?.userId.lastname}`}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Phone:</span>
            <p className="font-semibold text-800">
              {assistanceReq?.userId.contactNumber}
            </p>
          </div>
        </div>
        <BiSolidNotepad className="text-3xl text-primary-600" />
      </div>
    </>
  );
};

export default AssistanceDetails;
