import { Outlet } from "react-router-dom";

import { useGetUserByTokenQuery } from "../../../services/accountQuery";

import AccountSettingsList from "./components/AccountSettingsList";

const ManageAccountPage = () => {
  const { data: userData, isLoading, error } = useGetUserByTokenQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong</p>;
  }

  return (
    <div className="p-8 min-h-screen mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-primary-500">
          Account Settings
        </h1>
        <p>Manage your account settings and contact number.</p>
      </div>
      <hr />
      <main className="flex flex-row">
        <AccountSettingsList userData={userData} />
        <div className="flex-1 py-5 px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManageAccountPage;
