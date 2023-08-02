import { memo } from "react";
import {
  useCreateTeamMutation,
  useGetTeamsQuery,
} from "../../../services/teamQuery";
import TeamItem from "./TeamItem";

const TeamList = memo(() => {
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
              <TeamItem key={team._id} team={team} />
            ))}
            {createTeamState.isLoading && (
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
});

export default TeamList;
