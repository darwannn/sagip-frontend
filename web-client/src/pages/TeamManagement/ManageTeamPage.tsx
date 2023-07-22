import CreateTeamForm from "./Components/CreateTeamForm";
import TeamList from "./Components/TeamList";

const ManageTeamPage = () => {
  return (
    <div>
      <h1>Manage Team Page</h1>
      <CreateTeamForm />
      <TeamList />
    </div>
  );
};

export default ManageTeamPage;
