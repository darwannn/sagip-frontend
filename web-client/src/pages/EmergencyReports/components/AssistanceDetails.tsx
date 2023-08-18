import { BASE_IMAGE_URL } from "../../../api.config";
import { useAppSelector } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";
import moment from "moment";

const AssistanceDetails = () => {
  const assistanceReq = useAppSelector(selectAssistanceReq);

  console.log(assistanceReq);

  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      <span>{assistanceReq?._id}</span>
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
    </div>
  );
};

export default AssistanceDetails;
