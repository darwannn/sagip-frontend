import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateTeamMutation,
  useGetTeamsQuery,
} from "../../../services/teamQuery";

const TeamList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTeamsQuery(undefined);

  const [, createTeamState] = useCreateTeamMutation({
    fixedCacheKey: "createTeam",
  });

  if (isError) console.log(error);
  return (
    <div className="flex-grow overflow-x-auto">
      <span className="font-semibold text-lg">Team List</span>
      <div className="my-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data?.map((team) => (
              <div
                className={`my-2 p-2 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-100 ${
                  id ? (id === team._id ? "bg-gray-200" : "") : ""
                }`}
                key={team._id}
                onClick={() => {
                  navigate(`${team._id}`);
                }}
              >
                <div className="w-32 truncate">
                  <span className="text-sm text-gray-300">{team._id}</span>
                </div>
                <p className="text-lg">{team.name}</p>
              </div>
            ))}
            {!createTeamState.isLoading && (
              <div className="animate-pulse w-full h-16 my-2 p-2 rounded-md bg-gray-200">
                <div className="w-32 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-full h-6 mt-2 bg-gray-300 rounded-md"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamList;
