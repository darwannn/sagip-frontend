import { useParams } from "react-router-dom";

const TeamDetails = () => {
  const { id } = useParams();
  return <div>TeamDetails: {id}</div>;
};

export default TeamDetails;
