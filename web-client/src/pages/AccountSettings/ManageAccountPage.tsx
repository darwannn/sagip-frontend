import { Outlet } from "react-router-dom";

import { useGetUserByTokenQuery } from "../../services/accountQuery";

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
    <div className="w-full flex">
      <AccountSettingsList userData={userData} />
      {/* flex-1, takes the rest of the space */}
      {/* <ViewAccountPage userData={userData} /> */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageAccountPage;
