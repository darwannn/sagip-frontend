import { BASE_IMAGE_URL } from "../../../api.config";
import { useAppSelector } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";

const AssistanceDetails = () => {
  const selectedAssistanceReq = useAppSelector(selectAssistanceReq);

  console.log(selectedAssistanceReq);

  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      <span>{selectedAssistanceReq?._id}</span>
      <div className="user-info flex flex-row items-center gap-2">
        <div className="pic-container">
          <img
            src={`${BASE_IMAGE_URL}/user/${selectedAssistanceReq?.userId.profilePicture}`}
            alt="user"
            className="rounded-full w-20 h-20"
          />
        </div>
        {/* USER DETAILS */}
        <div className="user-details grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-gray-500">Name:</span>
            <p className="font-semibold">{`${selectedAssistanceReq?.userId.firstname} ${selectedAssistanceReq?.userId.lastname}`}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Phone:</span>
            <p className="font-semibold">
              {selectedAssistanceReq?.userId.contactNumber}
            </p>
          </div>
          <div className="col-span-2">
            <span className="text-sm text-gray-500">Address:</span>
            <p>{`${selectedAssistanceReq?.userId.street} ${selectedAssistanceReq?.street} ${selectedAssistanceReq?.userId.municipality} ${selectedAssistanceReq?.userId.province}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistanceDetails;
