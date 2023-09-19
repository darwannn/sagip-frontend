// Redux
import { useAppSelector } from "../../../../store/hooks";

// Services
import { useGetStatisticsQuery } from "../../../../services/accountQuery";
// Icons
import { FaUserPlus, FaUserCog } from "react-icons/fa";
import { HiUserGroup, HiHome } from "react-icons/hi";

import { BiLoaderAlt } from "react-icons/bi";
import Doughnut from "../../../../components/Charts/Doughnut";

const UserStatistics = () => {
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  const {
    data: statisticsData,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useGetStatisticsQuery();

  const loader = <BiLoaderAlt className="animate-spin" />;

  if (statisticsError) return <div>Something went wrong</div>;

  return (
    <>
      <div className="statistics flex flex-row my-5 gap-4">
        {isStaff ? (
          <>
            <div className="flex flex-col gap-2 p-6 xl:w-[250px] bg-blue-100 rounded-md">
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Total Staffs</span>
                <FaUserCog className="text-lg " />
              </div>
              <h3 className="text-2xl font-bold">
                {statisticsLoading ? loader : statisticsData?.staffs}
              </h3>
            </div>
            <div className="flex flex-row gap-6 p-6 bg-red-100 rounded-md text-sm">
              <div className="w-32">
                <Doughnut
                  data={[
                    {
                      title: "Responder",
                      value: statisticsData?.responders || 0,
                      color: "rgba(175, 185, 233, 1)",
                    },
                    {
                      title: " Dispatcher",
                      value: statisticsData?.dispatchers || 0,
                      color: "rgba(212, 85, 85, 1)",
                    },
                    {
                      title: " Admin",
                      value: statisticsData?.admins || 0,
                      color: "rgba(255, 194, 123, 1)",
                    },
                    {
                      title: " Super-admin",
                      value: statisticsData?.superAdmins || 0,
                      color: "rgba(99, 102, 241,1)",
                    },
                  ]}
                />
              </div>
              <div className="flex-1 items-center grid grid-flow-row grid-cols-2 gap-5 text-sm">
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-indigo-500"></span>
                    <span className="text-sm">Super Admin</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.superAdmins}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-yellow-500"></span>
                    <span className="text-sm">Admin</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.admins}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
                    <span className="text-sm">Dispatcher</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.dispatchers}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-blue-300"></span>
                    <span className="text-sm">Responder</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.dispatchers}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 p-6 xl:w-[250px] bg-blue-100 rounded-md">
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Total Users</span>
                <HiUserGroup className="text-lg " />
              </div>
              <h3 className="text-2xl font-bold">
                {statisticsLoading ? loader : statisticsData?.users}
              </h3>
            </div>
            <div className="flex flex-col gap-2 p-6 xl:w-[250px] bg-red-100 rounded-md">
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Total Residents</span>
                <HiHome className="text-lg" />
              </div>
              <h3 className="text-2xl font-bold">
                {statisticsLoading ? loader : statisticsData?.residents}
              </h3>
            </div>
            <div className="flex flex-col gap-2 p-6 xl:w-[250px] bg-purple-100 rounded-md">
              <div className="flex flex-row justify-between items-start">
                <p className="text-sm">New Users</p>
                <FaUserPlus className="text-lg" />
              </div>
              <h3 className="text-2xl font-bold">
                {statisticsLoading ? loader : statisticsData?.usersThisMonth}
              </h3>
              <span className="text-xs text-black opacity-80 justify-self-end">
                This month
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-5 p-6 xl:w-[350px] bg-amber-100 rounded-md">
              <div className="w-32 h-max">
                {statisticsLoading ? (
                  loader
                ) : (
                  <Doughnut
                    data={[
                      {
                        title: "Verified Users",
                        value: statisticsData?.verifiedUsers || 0,
                        color: "rgba(99, 102, 241,1)",
                      },
                      {
                        title: "Unverified Users",
                        value: statisticsData?.unverifiedUsers || 0,
                        color: "rgba(212, 85, 85, 1)",
                      },
                    ]}
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-3 text-sm">
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
                    <span className="text-sm">Unverified</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.unverifiedUsers}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
                    <span className="text-sm">Verified</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {statisticsData?.verifiedUsers}
                  </p>
                </div>
              </div>
            </div>
            {/* 
            <MultipleData
              data={[
                {
                  title: "Verified Users",
                  value: statisticsData?.verifiedUsers || 0,
                  color: "rgba(99, 102, 241,1)",
                },
                {
                  title: "Unverified Users",
                  value: statisticsData?.unverifiedUsers || 0,
                  color: "rgba(212, 85, 85, 1)",
                },
              ]}
              navigateTo="/"
            /> */}
          </>
        )}
      </div>
    </>
  );
};

export default UserStatistics;
