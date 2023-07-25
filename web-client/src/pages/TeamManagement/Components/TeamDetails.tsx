import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../../../services/teamQuery";
import { BASE_IMAGE_URL } from "../../../api.config";

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
        {teamData?.head !== null ? (
          <div className="flex flex-row gap-2">
            <div>
              <img
                src={`${BASE_IMAGE_URL}/user/${teamData?.head.profilePicture}`}
                alt="Team Leader"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">
                {teamData?.head._id}
              </span>
              <p className="font-bold">{`${teamData?.head.lastname}, ${teamData?.head.firstname} ${teamData?.head.middlename} 
          `}</p>
            </div>
          </div>
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
              {teamData?.members.map((member) => (
                <div
                  key={member._id}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <div>
                    <img
                      src={`${BASE_IMAGE_URL}/user/${member.profilePicture}`}
                      alt="Team Leader"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{member._id}</span>
                    <p className="font-bold">{`${member.lastname}, ${member.firstname} ${member.middlename} 
          `}</p>
                  </div>
                </div>
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
