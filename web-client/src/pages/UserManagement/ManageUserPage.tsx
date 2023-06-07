import { useEffect, useState } from "react";
import { User } from "../../types/user";

const ManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_BASE_URL}/auth`);
      const data = await response.json();
      setUsers(data);
      // print users after 5 seconds
    };
    fetchUsers();
  }, [API_BASE_URL]);
  console.log(users);

  return (
    <>
      <h1>User Management Page</h1>
    </>
  );
};

export default ManageUserPage;
