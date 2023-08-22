import { memo } from "react";

// Services / API
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedVerificationRequest } from "../../../store/slices/userManageSlice";

// Types
import type { User } from "../../../types/user";
// Icons
import { MdChevronRight } from "react-icons/md";

import moment from "moment";

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
      className="flex flex-row items-center rounded-md bg-gray-200  cursor-pointer  hover:bg-gray-300 p-5"
      onClick={onSelectVerificationRequestHandler}
    >
      <div className="flex flex-col flex-grow">
        <span className="text-sm text-gray-500">
          #{verificationRequests._id}
        </span>

        <div className=" flex flex-row">
          <span className="font-semibold text-xl">
            {verificationRequests.firstname} {verificationRequests.middlename}{" "}
            {verificationRequests.lastname}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-sm text-gray-500 ">
            {moment(verificationRequests.verificationRequestDate).format(
              "MMM DD, YYYY | h:mm A"
            )}
          </span>
        </div>
      </div>

      <div className="text-2xl">
        <MdChevronRight />
      </div>
    </div>
  );
});

export default VerifyUserItem;
