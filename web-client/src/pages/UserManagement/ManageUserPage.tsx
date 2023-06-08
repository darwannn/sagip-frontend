import { useEffect, useMemo, useState } from "react";
import { User, UserDisplayInfo } from "../../types/user";
import UserTable from "./UserTable";
import { createColumnHelper } from "@tanstack/react-table";

const ManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [usersDisplayInfo, setUsersDisplayInfo] = useState<UserDisplayInfo[]>(
  //   []
  // );
  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

  // FETCH USERS AT PAGE LOAD
  useEffect(() => {
    // TODO: add error handling
    const fetchUsers = async () => {
      const response = await fetch(`${API_BASE_URL}/account`);
      const data = await response.json();
      setUsers(data);
      // setUsersDisplayInfo(
      //   data.map((user: User) => {
      //     return {
      //       _id: user._id,
      //       firstname: user.firstname,
      //       lastname: user.lastname,
      //       email: user.email,
      //       region: user.region,
      //       province: user.province,
      //       municipality: user.municipality,
      //       barangay: user.barangay,
      //       street: user.street,
      //       status: user.status,
      //     };
      //   })
      // );
      // print users after 5 seconds
    };
    fetchUsers();
  }, [API_BASE_URL]);

  return (
    <>
      <h1>User Management Page</h1>
      <UserTable data={users} />
    </>
  );
};

export default ManageUserPage;
