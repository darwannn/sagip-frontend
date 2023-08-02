import { memo } from "react";
import { GoDotFill } from "react-icons/go";
import { BASE_IMAGE_URL } from "../../../api.config";
import { User } from "../../../types/user";
import { HiDotsVertical } from "react-icons/hi";

type TeamHeadInformationProps = {
  user: User;
};

const TeamHeadInformation: React.FC<TeamHeadInformationProps> = memo(
  ({ user }) => {
    return (
      <div className="w-full flex flex-row gap-4 justify-between p-5 my-2 rounded-md border">
        <div className="max-w-[180px]">
          <span className="font-semibold text-sm">User ID</span>
          <p className="truncate">{user._id}</p>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="image-wrapper">
            <img
              src={`${BASE_IMAGE_URL}/user/${user.profilePicture}`}
              alt="Team Leader"
              className="w-11 h-11 rounded-full"
            />
          </div>
          <div className="">
            <p className="font-semibold">{`${user.lastname}, ${user.firstname} ${user.middlename}`}</p>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="">
          <span className="font-semibold text-sm">Contact #</span>
          <p className="">{user.contactNumber}</p>
        </div>
        <div className="">
          <span className="font-semibold text-sm">Status</span>
          <div className="flex flex-row items-center">
            <GoDotFill
              className={`${
                user.isOnline ? "text-green-800" : "text-gray-500"
              }`}
            />
            <span>{user.isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
        <div className="self-center">
          <button className="text-xl flex justify-center items-center">
            <HiDotsVertical className="text-gray-500" />
          </button>
        </div>
      </div>
    );
  }
);

export default TeamHeadInformation;
