import { Link } from "react-router-dom";
import { LuChevronRight, LuPhone } from "react-icons/lu";
import { useGetUserByTokenQuery } from "../../../services/accountQuery";
import { MdAlternateEmail, MdPassword } from "react-icons/md";

const AccountInformationSettings = () => {
  const { data: userData, isLoading } = useGetUserByTokenQuery();

  if (isLoading) return <div>Loading User Data ...</div>;

  return (
    <div className="m-5 bg-white rounded-md">
      <Link
        to={"edit-email"}
        className="flex items-center justify-between p-3 text-gray-700"
      >
        <div className="flex items-center gap-2">
          <MdAlternateEmail className="text-base" />
          <div className="text-xs">
            <p className=" text-gray-400">Email</p>
            <p className=" font-medium text-gray-400">{userData?.email}</p>
          </div>
        </div>
        <div className="">
          <LuChevronRight className="text-gray-400" />
        </div>
      </Link>
      <hr />
      <Link
        to={"edit-contact"}
        className="flex items-center justify-between p-3 text-gray-700"
      >
        <div className="flex items-center gap-2">
          <LuPhone className="text-base" />
          <div className="text-xs">
            <p className="text-gray-400">Contact Number</p>
            <p className="font-medium text-gray-400">
              {userData?.contactNumber}
            </p>
          </div>
        </div>
        <div className="">
          <LuChevronRight className="text-gray-400" />
        </div>
      </Link>
      <hr />
      <Link
        to={"edit-password"}
        className="flex items-center justify-between px-3 py-5 text-gray-700"
      >
        <div className="flex items-center gap-2">
          <MdPassword className="text-base" />
          <div className="text-xs">
            <p className=" text-gray-400">Change Password</p>
          </div>
        </div>
        <div className="">
          <LuChevronRight className="text-gray-400" />
        </div>
      </Link>
    </div>
  );
};

export default AccountInformationSettings;
