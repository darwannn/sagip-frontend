import { NavLink } from "react-router-dom";

const AccountSettingsList = () => {
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
    </div>
  );
};

export default AccountSettingsList;
