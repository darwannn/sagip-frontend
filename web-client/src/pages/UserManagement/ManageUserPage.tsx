import { useEffect, useState } from "react";
import { User } from "../../types/user";
import UserTable from "./UserTable";
import { userColumn } from "./UserColumn";

const ManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

  // FETCH USERS AT PAGE LOAD
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/account`);
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        // TODO: Get error message
      }
    };
    fetchUsers();
  }, [API_BASE_URL]);

  const loadingElement = <p>Loading...</p>;

  return (
    <>
      <h1>User Management Page</h1>
      {/* <UserTable data={users} /> */}
      {isLoading ? (
        loadingElement
      ) : (
        <UserTable data={users} column={userColumn} />
      )}
    </>
  );
};

export default ManageUserPage;
