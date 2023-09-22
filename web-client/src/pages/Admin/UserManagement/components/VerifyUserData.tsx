// Services / API
import {
  useGetVerificationRequestByIdQuery,
  useUpdateVerificationRequestMutation,
} from "../../../../services/usersQuery";

// Types
import { BASE_IMAGE_URL } from "../../../../api.config";

import moment from "moment";

/* override backdrop style  */
import "../styles/lightgallery.css";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../util/date";
import { toast } from "react-toastify";

import Lightbox from "../../../../components/Lightbox/Lightbox";

const VerifyUserData = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get the selected verificationRequest
  const { data, isFetching, isError, error } =
    useGetVerificationRequestByIdQuery({ id: userId });

  const [updateVerificationRequest, updateVerificationRequestState] =
    useUpdateVerificationRequestMutation();

  if (updateVerificationRequestState.isError)
    console.log(updateVerificationRequestState.error);

  const onSubmitHandler = async (action: string) => {
    const res = await toast.promise(
      updateVerificationRequest({
        token,
        action,
        id: userId ?? "",
      }).unwrap(),
      {
        pending: "Loading...",
        success: "User has been updated",
        error: "Something went wrong",
      }
    );

    if (res.success) {
      navigate("/admin/users/verify-users");
    }
  };

  if (isFetching) return <p className="text-center">Loading User Data ...</p>;
  if (isError) {
    console.log(error);
    return <p className="text-center">Not Found</p>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-5 p-10">
      <div className="header flex flex-row justify-between items-center gap-3 bg-white p-5 rounded-md shadow">
        <div className="grow flex flex-row items-center gap-5">
          <div className="ml-1">
            <img
              className="w-16 h-16 rounded-full"
              src={`${BASE_IMAGE_URL}/user/${data?.profilePicture}`}
              alt="user avatar"
            />
          </div>
          {/* Info Container */}
          <div className="flex flex-col flex-1">
            <p className="font-semibold">{`${data?.firstname} ${data?.middlename} ${data?.lastname}`}</p>
            <p>{data?.email}</p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <button
            className="btn-secondary"
            onClick={() => onSubmitHandler("reject")}
          >
            {updateVerificationRequestState.isLoading
              ? "Rejecting Verification ...."
              : "Reject Verification"}
          </button>
          <button
            className="btn-primary "
            onClick={() => onSubmitHandler("approve")}
          >
            {updateVerificationRequestState.isLoading
              ? "Verifying User ...."
              : "Verify User"}
          </button>
        </div>
      </div>
      {/* User Details */}
      <div className=" flex flex-col gap-5 bg-white p-5 rounded shadow">
        <div className="flex flex-row flex-wrap gap-7">
          <div>
            <span className="form-label">Gender</span>
            <p>{data?.gender}</p>
          </div>
          <div>
            <span className="form-label">Birthdate</span>
            <p>{moment(data?.birthdate).format("MMM DD, YYYY")}</p>
          </div>
          <div>
            <span className="form-label">Contact Number</span>
            <p>{data?.contactNumber}</p>
          </div>
        </div>
        {/* Address */}
        <div className="">
          <span className="form-label">Address</span>
          <div className="flex flex-row flex-wrap gap-10">
            <div className=" w-max">
              <span className="form-label text-sm text-gray-500">Street</span>
              <p>{data?.street}</p>
            </div>
            <div className="w-max">
              <span className="form-label text-sm text-gray-500">Barangay</span>
              <p>{data?.barangay}</p>
            </div>
            <div className="w-max">
              <span className="form-label text-sm text-gray-500">
                Municipality
              </span>
              <p>{data?.municipality}</p>
            </div>
            <div className="w-max">
              <span className="form-label text-sm text-gray-500">Province</span>
              <p>{data?.province}</p>
            </div>
            <div className="w-max">
              <span className="form-label text-sm text-gray-500">Province</span>
              <p>{data?.region}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-7">
          <div>
            <span className="form-label text-sm">Account created at</span>
            <p>{moment(data?.createdAt).format("MMMM DD, YYYY")}</p>
          </div>
          <div>
            <span className="form-label text-sm">Request made at</span>
            <p>{formatDate(data?.verificationRequestDate)}</p>
          </div>
        </div>
        <div>
          <span className="form-label">Verification Picture</span>

          <Lightbox
            mediaURL={`${BASE_IMAGE_URL}/verification-request/${data?.verificationPicture[0]}`}
            isImage={true}
          >
            <div className=" w-[500px] bg-gray-100">
              <img
                src={`${BASE_IMAGE_URL}/verification-request/${data?.verificationPicture[0]}`}
                className="w-full h-full object-cover"
              />
            </div>
          </Lightbox>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserData;
