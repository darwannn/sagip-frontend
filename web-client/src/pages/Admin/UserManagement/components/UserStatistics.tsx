// Redux
import { useAppSelector } from "../../../../store/hooks";

// Services
import { useGetStatisticsQuery } from "../../../../services/accountQuery";
// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";

import SingleData from "../../../../components/Statistics/SingleData";
import MultipleData from "../../../../components/Statistics/MultipleData";

const UserStatistics = () => {
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  const {
    data: statisticsData,
    /* isLoading: statisticsLoading, */
    error: statisticsError,
  } = useGetStatisticsQuery();

  if (statisticsError) return <div>Something went wrong</div>;

  return (
    <>
      <div className="statistics flex flex-row h-52 m-5 gap-4">
        {isStaff ? (
          <>
            <SingleData
              title="Total Staffs"
              value={statisticsData?.staffs}
              icon={<BsFillPersonFill />}
              isPrimary={true}
              isThisMonth={false}
              navigateTo="/"
              style="user"
            />

            <MultipleData
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
              navigateTo="/"
            />
          </>
        ) : (
          <>
            <SingleData
              title="Total Users"
              value={statisticsData?.users}
              icon={<BsFillPersonFill />}
              isPrimary={true}
              isThisMonth={false}
              navigateTo="/"
              style="user"
            />
            <SingleData
              title="Total Residents"
              value={statisticsData?.residents}
              icon={<BsFillPersonFill />}
              isPrimary={false}
              isThisMonth={false}
              navigateTo="/"
              style="user"
            />
            <SingleData
              title="New Users"
              value={statisticsData?.usersThisMonth}
              icon={<FaUserPlus />}
              isPrimary={false}
              isThisMonth={true}
              navigateTo="/"
              style="user"
            />
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
            />
          </>
        )}
      </div>
    </>
  );
};

export default UserStatistics;
