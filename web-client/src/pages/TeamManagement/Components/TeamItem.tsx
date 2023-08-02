import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TTeam } from "../Types/Team";

type TProps = {
  team: TTeam;
};

const TeamItem: React.FC<TProps> = memo(({ team }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
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
  );
});

export default TeamItem;
