// TODO:
// 2. Move fetchUsers logic to loader function with react-routers
// 3. Add error handling for failed fetch

import { useEffect, useState } from "react";
import { User } from "../../types/user";
import UserTable from "./UserTable";

// Redux
import { useAppDispatch } from "../../store/hooks";
import { setUsers, setTableContent } from "../../store/slices/userManageSlice";

import moment from "moment";

const ManageUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Redux
  const dispatch = useAppDispatch();

  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

  // FETCH USERS AT PAGE LOAD
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/account`);
        const data = await response.json();
        dispatch(setUsers(data));
        setIsLoading(false);

        // Count all users
        console.log(`Total users: ${data.length}`);

        // Count all unverified and verified user
        const unverifiedUsers = data.filter(
          (user: User) => user.status === "unverified"
        );
        const verifiedUsers = data.filter(
          (user: User) => user.status === "verified"
        );
        console.log(`Unverified users: ${unverifiedUsers.length}`);
        console.log(`Verified users: ${verifiedUsers.length}`);

        // Count all the users that are created at the last month
        const lastMonth = moment().subtract(1, "month");
        const lastMonthUsers = data.filter((user: User) =>
          moment(user.createdAt).isSameOrAfter(lastMonth)
        );
        console.log(`Last month users: ${lastMonthUsers.length}`);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [API_BASE_URL, dispatch]);

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
      {isLoading ? (
        loadingElement
      ) : (
        // Pwedeng di ko na ipasa ung column as props kasi pede ko naman iimport ung column sa UserTable.tsx
        <UserTable />
      )}
    </>
  );
};

export default ManageUserPage;
