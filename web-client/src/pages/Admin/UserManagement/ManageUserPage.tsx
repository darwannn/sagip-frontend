import { useEffect } from "react";
import UserTable from "./components/UserTable";
// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setUsers,
  setTableContent,
} from "../../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../../services/usersQuery";

import UserStatistics from "./components/UserStatistics";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isStaff = useAppSelector((state) => state.userManage.isStaff);

  // Service
  const { data: users, isLoading, error } = useGetUsersDataQuery(undefined);

  // Store data to redux on page load
  useEffect(() => {
    if (users) dispatch(setUsers(users));
  }, [users, dispatch]);

  if (error) return <p>Oops! Something went wrong...</p>;

  const loadingElement = <p>Loading table ....</p>;

  return (
    <div className="p-10 min-h-screen flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-primary-500">Manage Users</h1>
        <p>Manage user accounts, access levels, and verify resident accounts</p>
      </div>
      <hr />
      <UserStatistics />
      <div className="flex flex-row gap-2 p-2 bg-gray-100 w-max rounded">
        <button
          className={`py-1 px-3 rounded 
        ${isStaff ? "text-gray-400" : "bg-primary-500 text-white"}
        `}
          onClick={() => dispatch(setTableContent(false))}
        >
          Residents
        </button>
        <button
          className={`py-1 px-5 rounded 
        ${isStaff ? "bg-primary-500 text-white" : "text-gray-400"}
        `}
          onClick={() => dispatch(setTableContent(true))}
        >
          Staffs
        </button>
      </div>
      <hr className="my-3" />
      {isLoading ? loadingElement : <UserTable />}
    </div>
  );
};

export default ManageUserPage;
