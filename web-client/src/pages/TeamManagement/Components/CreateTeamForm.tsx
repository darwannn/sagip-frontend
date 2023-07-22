import { useState } from "react";
import { useCreateTeamMutation } from "../../../services/teamQuery";

const CreateTeamForm = () => {
  const [teamName, setTeamName] = useState("");

  const [createTeam, createTeamState] = useCreateTeamMutation();

  const onCreatTeamHandler = () => {
    createTeam({ name: teamName });
    setTeamName("");
  };

  if (createTeamState.isLoading) console.log("Loading...");
  if (createTeamState.isSuccess) console.log(createTeamState.data);
  if (createTeamState.isError) console.log(createTeamState.error);
  return (
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
  );
};

export default CreateTeamForm;
