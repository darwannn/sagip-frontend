import { NavLink } from "react-router-dom";
// Icons
import { RxDashboard } from "react-icons/rx";
import { LiaUserSolid, LiaUsersSolid } from "react-icons/lia";
import { MdOutlineEmergencyShare, MdCrisisAlert } from "react-icons/md";
import { BiMapPin } from "react-icons/bi";
import { PiWarning, PiArticleMediumLight } from "react-icons/pi";

const AdminSidebar = () => {
  return (
    <div className="w-[300px] bg-white flex flex-col p-5">
      <div className="nav-header pb-5 flex flex-row items-center gap-3">
        <div className="logo-container w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
          {/* <span className="font-bold text-white text-xl">S</span> */}
        </div>
        <div className="nav-title">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            SAGIP
          </h1>
        </div>
      </div>
      <hr className="w-full h-[1.5px] border-0 bg-gray-200 self-center" />
      <nav className="grow py-5 flex flex-col gap-2">
        <NavLink className="w-full hover:bg-primary-100 p-2 rounded" to={"/"}>
          <div className="flex items-center gap-4">
            <span className="text-[24px] text-gray-600">
              <RxDashboard />
            </span>
            <span className="text-md text-gray-600">Dashboard</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/users"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <LiaUserSolid />
            </span>
            <span className="text-md text-gray-600">Users</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/teams"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <LiaUsersSolid />
            </span>
            <span className="text-md text-gray-600">Teams</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/emergency-reports"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <MdOutlineEmergencyShare />
            </span>
            <span className="text-md text-gray-600">Emergency Reports</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/facility-map"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <BiMapPin />
            </span>
            <span className="text-md text-gray-600">Facility Map</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/hazard-reports"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <PiWarning />
            </span>
            <span className="text-md text-gray-600">Hazard Reports</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/disaster-alerts"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <MdCrisisAlert />
            </span>
            <span className="text-md text-gray-600">Disaster Alerts</span>
          </div>
        </NavLink>
        <NavLink
          className="w-full hover:bg-primary-100 p-2 rounded"
          to={"/articles"}
        >
          <div className="flex items-center gap-4 ">
            <span className="text-[24px] text-gray-600">
              <PiArticleMediumLight />
            </span>
            <span className="text-md text-gray-600">Articles</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};
export default AdminSidebar;
