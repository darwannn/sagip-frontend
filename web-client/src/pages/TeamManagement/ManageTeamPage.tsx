import { useState } from "react";
import CreateTeamForm from "./Components/CreateTeamForm";
import TeamList from "./Components/TeamList";
import { useAppSelector } from "../../store/hooks";
import { selectSelectedTeam } from "../../store/slices/teamSlice";
import TeamDetails from "./Components/TeamDetails";

const ManageTeamPage = () => {
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const selectedTeam = useAppSelector(selectSelectedTeam);
  console.log(selectedTeam);

  return (
    <div className="flex flex-row h-screen">
      <div>
        <h1>Manage Team Page</h1>
        {isCreateTeam ? (
          <CreateTeamForm />
        ) : (
          <button
            className="border-2 px-2 py-1 rounded hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200"
            onClick={() => setIsCreateTeam(true)}
          >
            Create Team
          </button>
        )}
        <TeamList />
      </div>
      <div>
        <h1>Team Details</h1>
        {selectedTeam ? (
          <TeamDetails selectedTeam={selectedTeam} />
        ) : (
          <p>Select a team to view the details</p>
        )}
      </div>
    </div>
  );
};

export default ManageTeamPage;
