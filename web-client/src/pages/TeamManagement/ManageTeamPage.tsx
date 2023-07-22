import { useState } from "react";
import {
  useCreateTeamMutation,
  useGetTeamsQuery,
} from "../../services/teamQuery";
import TeamList from "./Components/TeamList";

const ManageTeamPage = () => {
  const [teamName, setTeamName] = useState("");

  const [createTeam, createTeamState] = useCreateTeamMutation();

  const onCreatTeamHandler = () => {
    createTeam({ name: teamName });
    setTeamName("");
  };

  return (
    <>
      <h1>Manage Team Page</h1>
      <div>
        <label htmlFor="teamName">Team Name: </label>
        <input
          type="text"
          name="teamName"
          className="border-2 "
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white py-1 px-3 rounded-md mx-2"
          onClick={onCreatTeamHandler}
        >
          Create Team
        </button>
      </div>
      <TeamList />
    </>
  );
};

export default ManageTeamPage;
