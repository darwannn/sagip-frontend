import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../../services/teamQuery";
import UserCard from "./UserCard";

const TeamDetails = () => {
  const { id } = useParams();
  const {
    data: teamData,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetTeamQuery(id || "");

  if (isLoading) console.log("Loading...");
  if (isSuccess) console.log(teamData);
  if (isError) console.log(error);

  if (isFetching) {
    return (
      <div>
        <p className="text-center">Fetching Team Data...</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div>
        <span className="text-sm text-gray-400">{teamData?._id}</span>
        <h1 className="text-3xl font-bold">{teamData?.name}</h1>
      </div>
      {/* Team Leader */}
      <div>
        <span>Team Leader: </span>
        {teamData && teamData.head !== null ? (
          <UserCard user={teamData.head} />
        ) : (
          <div className="border px-3 py-1 cursor-pointer rounded-md">
            <p className="text-gray-700 text-[16px] leading-tight">
              No leader assigned for this team.
            </p>
            <span className="text-sm text-gray-500">Click here to assign.</span>
          </div>
        )}
      </div>
      {/* Team Members */}
      <div>
        {teamData?.members && teamData.members.length > 0 ? (
          <div>
            <span>Team Members</span>
            <div className="">
              {teamData.members.map((member) => (
                <UserCard key={member._id} user={member} />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
