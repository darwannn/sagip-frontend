import { NavLink } from "react-router-dom";

import { User } from "../../../../types/user";
import { Badge } from "../../../../components/ui/Badge";

// import AccountDelete from "./AccountDelete";

type TProps = {
  userData?: User;
};
const AccountSettingsList = ({ userData }: TProps) => {
  const isVerified = userData?.emailStatus === "verified" ?? true;

  return (
    <div className="flex flex-col py-5 gap-1 w-full md:w-[250px] bg-white">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "child:bg-gray-200" : ""
          } text-sm font-semibold text-gray-700`
        }
        to={""}
        end
      >
        <div className="p-2 hover:bg-blue-100 rounded">Account</div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "child:bg-gray-200" : ""
          } text-sm font-semibold text-gray-700`
        }
        to={"profile"}
      >
        <div className="p-2 hover:bg-blue-100 rounded">Profile</div>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "child:bg-gray-200" : ""
          } text-sm font-semibold text-gray-700`
        }
        to={"contact-number"}
      >
        <div className="p-2 hover:bg-blue-100 rounded">Contact Number</div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "child:bg-gray-200" : ""
          } text-sm  font-semibold text-gray-700`
        }
        to={"email"}
      >
        <div className="p-2 hover:bg-blue-100 flex flex-row justify-between rounded">
          <span>Email</span>
          {!isVerified && <Badge className="bg-yellow-300">Unverified</Badge>}
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "child:bg-gray-200" : ""
          } text-sm font-semibold text-gray-700`
        }
        to={"password"}
      >
        <div className="p-2 hover:bg-blue-100 rounded">Password</div>
      </NavLink>
    </div>
  );
};

export default AccountSettingsList;
