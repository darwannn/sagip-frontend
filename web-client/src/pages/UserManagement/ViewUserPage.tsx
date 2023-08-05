import { useParams, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import { useGetUserByIdQuery } from "../../services/usersApi";

const ViewUserPage = () => {
  const { userId } = useParams();
  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(userId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/users"}
      >
        Cancel
      </Link>
      <UserForm userData={userData} />
    </div>
  );
};

export default ViewUserPage;
