import { useEffect } from "react";
import UserTable from "./components/UserTable";
// Redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setUsers,
  setTableContent,
  selectNumberOfUsers,
  selectNumberOfNewUsers,
  selectVerifiedUsers,
  selectNumberOfStaff,
  selectNumberOfResidents,
} from "../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../services/usersQuery";
// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";

import SingleData from "../../components/Statistics/SingleData";
import MultipleData from "../../components/Statistics/MultipleData";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  const totalUsersCount = useAppSelector(selectNumberOfUsers);
  const totalResidentsCount = useAppSelector(selectNumberOfResidents);
  const newUsersCount = useAppSelector(selectNumberOfNewUsers);
  const staffCount = useAppSelector(selectNumberOfStaff);

  const { verifiedCount, unverifiedCount } =
    useAppSelector(selectVerifiedUsers);
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
      <div className="statistics flex flex-row h-52 m-5 gap-4">
        {isStaff ? (
          <>
            <SingleData
              title="Total Staffs"
              value={staffCount.totalStaff}
              icon={<BsFillPersonFill />}
              isPrimary={true}
              isThisMonth={false}
              navigateTo="/"
            />

            <MultipleData
              data={[
                {
                  title: "Responder",
                  value: staffCount.responderCount,
                  color: "rgba(175, 185, 233, 1)",
                },
                {
                  title: " Dispatcher",
                  value: staffCount.dispatcherCount,
                  color: "rgba(212, 85, 85, 1)",
                },
                {
                  title: " Admin",
                  value: staffCount.adminCount,
                  color: "rgba(255, 194, 123, 1)",
                },
                {
                  title: " Super-admin",
                  value: staffCount.superAdminCount,
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
              value={totalUsersCount}
              icon={<BsFillPersonFill />}
              isPrimary={true}
              isThisMonth={false}
              navigateTo="/"
            />
            <SingleData
              title="Total Residents"
              value={totalResidentsCount}
              icon={<BsFillPersonFill />}
              isPrimary={false}
              isThisMonth={false}
              navigateTo="/"
            />
            <SingleData
              title="New Users"
              value={newUsersCount}
              icon={<FaUserPlus />}
              isPrimary={false}
              isThisMonth={true}
              navigateTo="/"
            />
            <MultipleData
              data={[
                {
                  title: "Verified Users",
                  value: verifiedCount,
                  color: "rgba(99, 102, 241,1)",
                },
                {
                  title: "Unverified Users",
                  value: unverifiedCount,
                  color: "rgba(212, 85, 85, 1)",
                },
              ]}
              navigateTo="/"
            />
          </>
        )}
      </div>
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
