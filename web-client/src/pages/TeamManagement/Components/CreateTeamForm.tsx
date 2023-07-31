import { useState, memo } from "react";
import { useCreateTeamMutation } from "../../../services/teamQuery";
import { MdClose } from "react-icons/md";

type TProps = {
  closeForm: () => void;
};

const CreateTeamForm: React.FC<TProps> = memo(({ closeForm }) => {
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
    <div className="flex flex-col gap-1 my-2">
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
          onClick={onCreatTeamHandler}
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
    </div>
  );
});

export default CreateTeamForm;
