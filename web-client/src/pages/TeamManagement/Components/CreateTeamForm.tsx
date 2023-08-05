import React, { useState, memo } from "react";
import { useCreateTeamMutation } from "../../../services/teamQuery";
import { MdClose } from "react-icons/md";
import { TTeamResponse } from "../Types/Team";
import { useNavigate } from "react-router-dom";

type TProps = {
  closeForm: () => void;
};

const CreateTeamForm: React.FC<TProps> = memo(({ closeForm }) => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");

  const [createTeam, createTeamState] = useCreateTeamMutation({
    fixedCacheKey: "createTeam",
  });

  const onCreatTeamHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createTeam({ name: teamName });
    setTeamName("");
    // closeForm();
    if ("data" in res) {
      if (res.data.success) {
        closeForm();
        navigate(`${res.data.team?._id}`);
      }
    }
  };

  if (createTeamState.isLoading) console.log("Loading...");
  if (createTeamState.isSuccess) console.log(createTeamState.data);
  if (createTeamState.isError && "data" in createTeamState.error) {
    const errData = createTeamState.error.data as TTeamResponse;
    console.log(errData);
  }
  return (
    <form
      onSubmit={(e) => onCreatTeamHandler(e)}
      className="flex flex-col gap-1 my-2"
    >
      <div>
        <input
          type="text"
          name="teamName"
          className="border rounded p-1 w-full"
          id="teamName"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-1">
        <button
          type="submit"
          className="bg-indigo-500 text-white py-1 px-3 rounded-md"
        >
          Add Team
        </button>
        <button
          className="text-gray-400 text-2xl hover:text-gray-500 transition-all duration-100"
          onClick={closeForm}
        >
          <MdClose />
        </button>
      </div>
    </form>
  );
});

export default CreateTeamForm;
