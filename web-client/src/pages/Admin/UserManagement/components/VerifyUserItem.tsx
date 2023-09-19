import { memo } from "react";

// Services / API
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedVerificationRequest } from "../../../../store/slices/userManageSlice";

// Types
import type { User } from "../../../../types/user";
// Icons
import { BASE_IMAGE_URL } from "../../../../api.config";
import { formatDate } from "../../../../util/date";

type TProps = {
  verificationRequests: User;
};

const VerifyUserItem = memo(({ verificationRequests }: TProps) => {
  const dispatch = useAppDispatch();

  const onSelectVerificationRequestHandler = () => {
    dispatch(setSelectedVerificationRequest(verificationRequests));
  };

  return (
    <div
      className="flex flex-row gap-5 items-center bg-gray-100 rounded-md p-3 text-sm cursor-pointer hover:bg-gray-200 hover:translate-x-1 transition-all duration-200 relative"
      onClick={onSelectVerificationRequestHandler}
    >
      {/* Avatar Container */}
      <div className="ml-1">
        <img
          className="w-16 h-16 rounded-full"
          src={`${BASE_IMAGE_URL}/user/${verificationRequests.profilePicture}`}
          alt="user avatar"
        />
      </div>
      {/* Info Container */}
      <div className="flex flex-col flex-1">
        <p className="font-semibold">{`${verificationRequests.firstname} ${verificationRequests.middlename} ${verificationRequests.lastname}`}</p>
        <p>{verificationRequests.email}</p>
        <hr className="my-2" />
        <div className="flex flex-row items-center gap-2 text-sm">
          <span>
            {formatDate(verificationRequests.verificationRequestDate)}
          </span>
        </div>
      </div>
      {
        // Show if active
        // <span className="absolute z-10 left-0 w-1 h-5 rounded-full bg-red-500"></span>
      }
    </div>
  );
});

export default VerifyUserItem;
