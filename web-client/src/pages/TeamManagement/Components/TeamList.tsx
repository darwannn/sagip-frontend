import { useNavigate } from "react-router-dom";
import { useGetTeamsQuery } from "../../../services/teamQuery";

const TeamList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetTeamsQuery(undefined);

  if (isError) console.log(error);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((team) => (
            <div
              key={team._id}
              onClick={() => {
                navigate(`${team._id}`);
              }}
            >
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;
