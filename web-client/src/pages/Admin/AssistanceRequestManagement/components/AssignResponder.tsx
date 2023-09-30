import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetActiveTeamsQuery } from "../../../../services/teamQuery";
import { useAssignTeamToAssistanceRequestMutation } from "../../../../services/assistanceRequestQuery";
import { toast } from "react-toastify";
import Select from "react-select";

const AssignResponderPanel = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const {
    data: rescueTeam,
    isSuccess,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamError,
  } = useGetActiveTeamsQuery();
  const [assignTeam, assignTeamState] =
    useAssignTeamToAssistanceRequestMutation();

  // Get the names of the rescue team and put it in the select options
  const rescueTeamNames = rescueTeam?.map((team) => ({
    value: team._id,
    label: team.name,
  }));

  const assignRescueTeamHandler = async () => {
    if (selectedTeam === "") return;
    const res = await toast.promise(
      assignTeam({ id: id ?? "", teamId: selectedTeam }).unwrap,
      {
        pending: "Assigning Rescue Team...",
        success: "Rescue Team Assigned!",
        error: "Failed to assign Rescue Team",
      }
    );
    if (!res.success) {
      console.log(res.message);
    }
  };

  if (isTeamLoading) console.log("Loading...");
  if (isTeamError) console.log(teamError);
  if (isSuccess) console.log(rescueTeam);
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex flex-row gap-2 text-gray-700">
        <h3 className="text-md font-semibold">Select Available Responders</h3>
      </div>
      <div className="text-sm">
        <Select
          options={rescueTeamNames}
          onChange={(e) => setSelectedTeam(e?.value ?? "")}
        />
        <button
          className="btn-primary mt-5"
          onClick={assignRescueTeamHandler}
          disabled={assignTeamState.isLoading}
        >
          Send Responders
        </button>
      </div>
    </div>
  );
};

export default AssignResponderPanel;
