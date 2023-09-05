import { NavLink, useNavigate } from "react-router-dom";
// Icons
import { RxDashboard } from "react-icons/rx";
import { LiaUserSolid, LiaUsersSolid } from "react-icons/lia";
import { MdOutlineEmergencyShare, MdCrisisAlert } from "react-icons/md";
import { BiMapPin } from "react-icons/bi";
import { PiWarning, PiArticleMediumLight } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";
import MiniProfile from "./MiniProfile";
import { FaRegMessage } from "react-icons/fa6"
import { HiOutlineBell } from "react-icons/hi"

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-[300px] z-10 border-r bg-white flex flex-col p-5">
      <div className="nav-header pb-2 flex flex-row items-center gap-3">
        <div className="logo-container w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
          {/* <span className="font-bold text-white text-xl">S</span> */}
        </div>
        <div className="nav-title">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            SAGIP
          </h1>
        </div>
      </div>
      {/* <hr className="w-full h-[1px] border-0 bg-gray-200 self-center" /> */}
      <nav className="grow py-5 flex flex-col gap-1">
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/admin"}
        >
          <div className="flex items-center gap-4">
            <span className="text-[18px] text-gray-600">
              <RxDashboard />
            </span>
            <span className="text-gray-600">Dashboard</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"users"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <LiaUserSolid />
            </span>
            <span className="text-gray-600">Users</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"teams"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <LiaUsersSolid />
            </span>
            <span className="text-gray-600">Teams</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"emergency-reports"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <MdOutlineEmergencyShare />
            </span>
            <span className="text-gray-600">Emergency Reports</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"facility-map"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <BiMapPin />
            </span>
            <span className="text-gray-600">Facility Map</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"hazard-reports"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <PiWarning />
            </span>
            <span className="text-gray-600">Hazard Reports</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"wellness-check"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <MdCrisisAlert />
            </span>
            <span className="text-gray-600">Wellness Check</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"manage-articles"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <PiArticleMediumLight />
            </span>
            <span className="text-gray-600">Articles</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"alert-management"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[16px] text-gray-600">
              <FaRegMessage />
            </span>
            <span className="text-gray-600">Alerts</span>
          </div>
        </NavLink>
      </nav>
      <hr className="w-full h-[1px] border-0 bg-gray-200 self-center mb-5" />
      {/* MINI PROFILE */}
      <MiniProfile />
      <div className="flex flex-col mt-5">
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"#"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <HiOutlineBell />
            </span>
            <span className="text-gray-600">Notifications</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"account-settings"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <SlSettings />
            </span>
            <span className="text-gray-600">Account Settings</span>
          </div>
        </NavLink>
        <button
          className="w-full hover:bg-primary-100 p-2 rounded"
          onClick={() => logout()}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[18px] text-gray-600">
              <TbLogout2 />
            </span>
            <span className="text-gray-600">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};
export default AdminSidebar;
