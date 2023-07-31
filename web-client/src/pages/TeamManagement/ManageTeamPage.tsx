import { useState } from "react";
import CreateTeamForm from "./Components/CreateTeamForm";
import TeamList from "./Components/TeamList";
import { Outlet } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
const ManageTeamPage = () => {
  const [isCreateTeam, setIsCreateTeam] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <div className="p-5 bg-gray-50 shadow-md w-[300px] flex flex-col">
        <h1 className="text-xl font-bold">Manage Team</h1>
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
