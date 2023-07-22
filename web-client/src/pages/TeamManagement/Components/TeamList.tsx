import { useGetTeamsQuery } from "../../../services/teamQuery";

const TeamList = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetTeamsQuery(undefined);
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
            <div key={team._id}>
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
