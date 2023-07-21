import { useState } from "react";
import {
  useCreateTeamMutation,
  useGetTeamsQuery,
} from "../../services/teamQuery";

const ManageTeamPage = () => {
  const [teamName, setTeamName] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetTeamsQuery(undefined);

  const [createTeam, createTeamState] = useCreateTeamMutation();

  const onCreatTeamHandler = () => {
    createTeam({ name: teamName });
    setTeamName("");
  };

  if (isLoading) console.log("Loading...");
  if (isSuccess) console.log(data);
  if (isError) console.log(error);

  if (createTeamState.isSuccess) console.log(createTeamState.data);
  if (createTeamState.isError) console.log(createTeamState.error);
  if (createTeamState.isLoading) console.log("Creating...");

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
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data?.map((team) => (
              <div key={team._id}>
                <p>{team.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageTeamPage;
