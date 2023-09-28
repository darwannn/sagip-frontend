import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

import type { Token } from "../../../../types/auth";
import jwtDecode from "jwt-decode";
const AccountSettingsList = () => {
  const decodedToken = jwtDecode<Token>(localStorage.getItem("token") || "");
  return (
    <div className="m-5">
      <Link to="/responder/">
        {decodedToken.userType === "responder" && (
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
        )}
      </Link>
    </div>
  );
};

export default AccountSettingsList;
