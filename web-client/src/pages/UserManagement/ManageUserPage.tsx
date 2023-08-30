import { useEffect } from "react";
import UserTable from "./components/UserTable";
// Redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, setTableContent } from "../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../services/usersQuery";

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
    <>
      <UserStatistics />
      <div className="border-gray-400 border-b-2 mx-5 mt-5">
        <button
          className={
            isStaff
              ? " text-gray-400  px-3 py-1 mx-1 rounded-sm"
              : " text-indigo-500 border-indigo-500 border-b-2 px-3 py-1 mx-1 rounded-sm"
          }
          onClick={() => dispatch(setTableContent(false))}
        >
          Residents
        </button>
        <button
          className={
            isStaff
              ? " text-indigo-500 border-indigo-500 border-b-2 px-3 py-1 mx-1 rounded-sm"
              : " text-gray-400  px-3 py-1 mx-1 rounded-sm"
          }
          onClick={() => dispatch(setTableContent(true))}
        >
          Staff Users
        </button>
      </div>
      {isLoading ? loadingElement : <UserTable />}
    </>
  );
};

export default ManageUserPage;
