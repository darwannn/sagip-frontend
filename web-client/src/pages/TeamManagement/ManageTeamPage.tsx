import { useGetTeamsQuery } from "../../services/teamQuery";

const ManageTeamPage = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetTeamsQuery(undefined);

  if (isLoading) console.log("Loading...");
  if (isSuccess) console.log(data);
  if (isError) console.log(error);

  return (
    <>
      <h1>Manage Team Page</h1>
    </>
  );
};

export default ManageTeamPage;
