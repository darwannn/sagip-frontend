import { Link, useNavigate } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

import type { Token } from "../../../../types/auth";
import jwtDecode from "jwt-decode";
import { BsPersonBadge } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
const MobileSettingsList = () => {
  const navigate = useNavigate();
  const decodedToken = jwtDecode<Token>(localStorage.getItem("token") || "");

  const onLogOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.AndroidInterface?.removeFcmToken();
  };

  return (
    <div className="flex flex-col p-5">
      {decodedToken.userType == "responder" && (
        <Link to="/responder/">
          <div
            className="flex items-center p-5 mb-5 rounded-md  bg-gray-100 text-white"
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
        <div className="bg-white text-sm rounded-md mb-5 shadow">
          <Link
            to={"edit-profile"}
            className="flex items-center gap-3 p-3 text-gray-700"
          >
            <BsPersonBadge className="text-lg" />
            Profile Information
          </Link>
          <hr />
          <Link
            to={"account-information"}
            className="flex items-center gap-3 p-3 text-gray-700"
          >
            <RiUserSettingsLine className="text-lg" />
            Account Information
          </Link>
        </div>
      </nav>
      <div className="mt-5">
        <button
          className="bg-white w-full p-2 text-sm rounded-md shadow-sm text-red-500"
          onClick={onLogOutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileSettingsList;
