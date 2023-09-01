import { useState } from "react";
import CreateTeamForm from "./components/CreateTeamForm";
import TeamList from "./components/TeamList";
import { Link, Outlet } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
const ManageTeamPage = () => {
  const [isCreateTeam, setIsCreateTeam] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <div className="p-5 bg-gray-50 shadow-md w-[300px] flex flex-col">
        <h1 className="text-xl font-bold">Manage Team</h1>
        <Link
          to="/teams"
          className="text-center bg-blue-500 py-2 border rounded-md text-white"
        >
          <MdManageAccounts className="inline-block mr-2 text-xl" />
          Manage Responders
        </Link>
        {isCreateTeam ? (
          <CreateTeamForm closeForm={() => setIsCreateTeam(false)} />
        ) : (
          <div
            className="flex flex-row items-center gap-2 my-2 w-full text-gray-700 rounded p-1 cursor-pointer hover:text-gray-900 hover:bg-gray-200 transition-all duration-100"
            onClick={() => setIsCreateTeam(true)}
          >
            <span className="text-xl">
              <IoAddSharp />
            </span>
            <span>Create Team</span>
          </div>
        )}
        <TeamList />
      </div>
      <Outlet />
    </div>
  );
};

export default ManageTeamPage;
