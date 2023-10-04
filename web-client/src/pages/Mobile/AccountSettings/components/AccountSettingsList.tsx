import { Link } from "react-router-dom";
import { MdAlternateEmail, MdChevronRight, MdPassword } from "react-icons/md";

import type { Token } from "../../../../types/auth";
import jwtDecode from "jwt-decode";
import { BsPersonBadge } from "react-icons/bs";
import { LuPhone } from "react-icons/lu";
const AccountSettingsList = () => {
  const decodedToken = jwtDecode<Token>(localStorage.getItem("token") || "");
  return (
    <div className="flex flex-col p-5">
      {decodedToken.userType == "responder" && (
        <Link to="/responder/">
          <div
            className="flex items-center p-5  rounded-2xl  bg-gray-100 text-white"
            style={{
              background: `linear-gradient(90deg, #972020 0%, #293B95 100%)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
            }}
          >
            <p className="flex-1">Response Dashboard</p>{" "}
            <MdChevronRight className="text-2xl" />
          </div>
        </Link>
      )}
      <nav>
        <div className="mb-2">
          <h2 className="font-semibold text-base">Profile</h2>
        </div>
        <div className="bg-white text-sm rounded-md mb-5 shadow">
          <Link
            to={"edit-profile"}
            className="flex items-center gap-3 p-3 text-gray-700"
          >
            <BsPersonBadge className="text-lg" />
            Edit Profile Information
          </Link>
        </div>
        <div className="mb-2">
          <h2 className="font-semibold text-base">Account Settings</h2>
        </div>
        <div className="bg-white text-sm rounded-md shadow">
          <Link
            to={"edit-email"}
            className="flex items-center gap-3 p-3 text-gray-700 border-b"
          >
            <MdAlternateEmail className="text-lg" />
            Edit Email
          </Link>
          <Link
            to={"edit-contact"}
            className="flex items-center gap-3 p-3 text-gray-700 border-b"
          >
            <LuPhone className="text-lg" />
            Edit Contact Number
          </Link>
          <Link
            to={"edit-password"}
            className="flex items-center gap-3 p-3 text-gray-700"
          >
            <MdPassword className="text-lg" />
            Change Password
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AccountSettingsList;
