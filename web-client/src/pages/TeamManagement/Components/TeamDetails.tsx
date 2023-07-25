import { TTeam } from "../Types/Team";

type TProps = {
  selectedTeam: TTeam;
};

const TeamDetails = ({ selectedTeam }: TProps) => {
  return (
    <div>
      <p>{selectedTeam.name}</p>
      <div>
        <p>Head:</p>
        <p>{selectedTeam.head?.firstname}</p>
      </div>
      <div>
        <p>Members:</p>
        {selectedTeam.members?.map((member) => (
          <p key={member._id}>{member.firstname}</p>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
