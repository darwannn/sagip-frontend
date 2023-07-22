import { useState } from "react";
import CreateTeamForm from "./Components/CreateTeamForm";
import TeamList from "./Components/TeamList";

const ManageTeamPage = () => {
  const [isCreateTeam, setIsCreateTeam] = useState(false);

  return (
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
  );
};

export default ManageTeamPage;
