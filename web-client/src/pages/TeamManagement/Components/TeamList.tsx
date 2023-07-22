import { useGetTeamsQuery } from "../../../services/teamQuery";
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedTeam } from "../../../store/slices/teamSlice";

const TeamList = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetTeamsQuery(undefined);
  const dispatch = useAppDispatch();

  if (isLoading) console.log("Loading...");
  if (isSuccess) console.log(data);
  if (isError) console.log(error);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((team) => (
            <div key={team._id} onClick={() => dispatch(setSelectedTeam(team))}>
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
