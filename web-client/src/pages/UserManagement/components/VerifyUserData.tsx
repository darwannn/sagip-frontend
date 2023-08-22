// Services / API
import { useAppDispatch } from "../../../store/hooks";
import { useUpdateVerificationRequestMutation } from "../../../services/usersQuery";
import { unsetSelectedVerificationRequest } from "../../../store/slices/userManageSlice";

// Types
import type { User } from "../../../types/user";
import { BASE_IMAGE_URL } from "../../../api.config";
// Icons
import { MdClose } from "react-icons/md";

import moment from "moment";

/* lightgallery */
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgRotate from "lightgallery/plugins/rotate";
import LightGallery from "lightgallery/react";

/* override backdrop style  */
import "../styles/lightgallery.css";

type TProps = {
  verificationRequest?: User;
};

const VerifyUserData = ({ verificationRequest }: TProps) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  /* reset scroll position to top */
  /*   useEffect(() => {
    window.scrollTo(0, 0);
  }, [verificationRequest]); */

  const [updateVerificationRequest, updateVerificationRequestState] =
    useUpdateVerificationRequestMutation();

  if (updateVerificationRequestState.isLoading) console.log("Loading...");
  if (updateVerificationRequestState.isError)
    console.log(updateVerificationRequestState.error);

  const onSubmitHandler = async (action: string) => {
    updateVerificationRequest({
      token,
      action,
      id: verificationRequest?._id ?? "",
    });
    dispatch(unsetSelectedVerificationRequest());
    return;
  };

  return (
    <div className=" w-full flex flex-grow relative bg-white p-10 m-5 rounded-3xl">
      <div className="w-full flex-col px-2">
        <button
          className="absolute top-8 right-8 hover:bg-gray-300 rounded  text-gray-500"
          onClick={() => {
            if (verificationRequest) {
              dispatch(unsetSelectedVerificationRequest());
            }
          }}
        >
          <MdClose />
        </button>
        <div className="text-sm text-gray-500">#{verificationRequest?._id}</div>
        <div className="font-semibold text-3xl">
          {verificationRequest?.firstname} {verificationRequest?.middlename}{" "}
          {verificationRequest?.lastname}
        </div>
        <div className="flex xl:flex-row flex-col mt-2">
          <div className="text-md text-gray-500 xl:flex-grow">
            Address: {verificationRequest?.street},{" "}
            {verificationRequest?.barangay}, {verificationRequest?.municipality}
            , {verificationRequest?.province}
          </div>
          <div className="text-md text-gray-500 ml-0 xl:ml-5">
            Date of Birth:{" "}
            {moment(verificationRequest?.birthdate).format("MMM DD, YYYY")}
          </div>
        </div>

        <div className="text-md text-gray-500">
          Contact Number: {verificationRequest?.contactNumber}
        </div>
        <div className="text-md text-gray-500">
          Date Created:{" "}
          {moment(verificationRequest?.createdAt).format(
            "MMM DD, YYYY | hh:mm A"
          )}
        </div>
        <div className="text-md text-gray-500">
          Date Requested:{" "}
          {moment(verificationRequest?.verificationRequestDate).format(
            "MMM DD, YYYY | hh:mm A"
          )}
        </div>
        <LightGallery speed={200} plugins={[lgZoom, lgRotate]}>
          <a
            href={`${BASE_IMAGE_URL}/verification-request/${verificationRequest?.verificationPicture[0]}`}
          >
            <div className=" mx-auto my-8 bg-gray-100   ">
              <img
                src={`${BASE_IMAGE_URL}/verification-request/${verificationRequest?.verificationPicture[0]}`}
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </LightGallery>
        <div className="text-right">
          <button
            className="p-2 rounded text-white bg-indigo-500"
            onClick={() => onSubmitHandler("reject")}
          >
            {updateVerificationRequestState.isLoading
              ? "Rejecting Verification ...."
              : "Reject Verification"}
          </button>
          <button
            className="ml-5 p-2 rounded text-white bg-red-500"
            onClick={() => onSubmitHandler("approve")}
          >
            {updateVerificationRequestState.isLoading
              ? "Verifying User ...."
              : "Verify User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserData;
