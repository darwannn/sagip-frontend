import { useEffect } from "react";
import UserTable from "./UserTable";

// Redux
import { useAppDispatch } from "../../store/hooks";
import { setUsers, setTableContent } from "../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../services/usersApi";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();

  // Service
  const { data: users, isLoading, error } = useGetUsersDataQuery(undefined);

  // Store data to redux
  useEffect(() => {
    if (users) dispatch(setUsers(users));
  }, [users, dispatch]);

  if (error) return <p>Oops! Something went wrong...</p>;
  const loadingElement = <p>Loading...</p>;

  return (
    <>
      <h1>User Management Page</h1>
      <button
        className="border-b-2 px-3 py-1 m-1 rounded-sm text-indigo-500 border-indigo-500"
        onClick={() => dispatch(setTableContent(false))}
      >
        All Users
      </button>
      <button
        className="border-b-2 px-3 py-1 m-1 rounded-sm text-indigo-500 border-indigo-500"
        onClick={() => dispatch(setTableContent(true))}
      >
        Staff Users
      </button>
      {isLoading ? loadingElement : <UserTable />}
    </>
  );
};

export default ManageUserPage;
