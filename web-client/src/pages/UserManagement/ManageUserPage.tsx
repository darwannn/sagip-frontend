// TODO: Extract user to a separate component.

import { useEffect } from "react";
import UserTable from "./UserTable";

// Redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setUsers,
  setTableContent,
  selectNumberOfUsers,
  selectNumberOfNewUsers,
  selectVerifiedUsers,
} from "../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../services/usersApi";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const totalUsersCount = useAppSelector(selectNumberOfUsers);
  const newUsersCount = useAppSelector(selectNumberOfNewUsers);
  const { verifiedCount, unverifiedCount } =
    useAppSelector(selectVerifiedUsers);
  // Service
  const { data: users, isLoading, error } = useGetUsersDataQuery(undefined);

  // Store data to redux on page load
  useEffect(() => {
    if (users) dispatch(setUsers(users));
  }, [users, dispatch]);

  if (error) return <p>Oops! Something went wrong...</p>;

  const loadingElement = <p>Loading table ....</p>;

  return (
    <>
      <h1>User Management Page</h1>
      <div className="statistics flex flex-row">
        <div className="border-2 rounded p-3 m-2">
          <span>{totalUsersCount}</span>
          <h2>Total Users</h2>
          {/* ICON */}
        </div>
        <div className="border-2 rounded p-3 m-2">
          <span>{newUsersCount}</span>
          <h2>New Users</h2>
          <span>This month</span>
          {/* ICON */}
        </div>
        <div className="border-2 rounded p-3 m-2">
          <span>{verifiedCount}</span>
          <h2>Verified Users</h2>
          <span>{unverifiedCount}</span>
          <h2>Unverified Users</h2>
          {/* ICON */}
        </div>
      </div>
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
