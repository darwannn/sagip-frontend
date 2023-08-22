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
} from "../../store/slices/userManageSlice";
// Services
import { useGetUsersDataQuery } from "../../services/usersApi";
// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isStaff = useAppSelector((state) => state.userManage.isStaff);
  const totalUsersCount = useAppSelector(selectNumberOfUsers);
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
      <div className="statistics flex flex-row">
        {isStaff ? (
          <>
            <div className="flex flex-col border-2 rounded-xl p-5 m-2 border-indigo-300 bg-indigo-300 text-gray-800">
              <span className="font-bold text-3xl">
                {staffCount.totalStaff}
              </span>
              <h2>Total Staffs</h2>
              <BsFillPersonFill className="mr-2  mt-auto text-3xl" />
            </div>
            <div className="flex border-2 rounded-xl p-5 m-2 border-gray-100 bg-gray-100 text-gray-800">
              <div className="mr-5">
                <span className="font-bold text-3xl">
                  {staffCount.responderCount}
                </span>
                <h2 className="mb-3">Responders</h2>
                <span className="font-bold text-3xl">
                  {staffCount.dispatcherCount}
                </span>
                <h2>Dispatcher</h2>
              </div>
              <div>
                <span className="font-bold text-3xl">
                  {staffCount.adminCount}
                </span>
                <h2 className="mb-3">Admin</h2>
                <span className="font-bold text-3xl">
                  {staffCount.superAdminCount}
                </span>
                <h2>Super-admin</h2>
              </div>
              {/* ICON */}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col border-2 rounded-xl p-5 m-2 border-indigo-300 bg-indigo-300 text-gray-800">
              <span className="font-bold text-3xl">{totalUsersCount}</span>
              <h2>Total Users</h2>

              <BsFillPersonFill className="mr-2  mt-auto text-3xl" />
            </div>

            <div className="flex flex-col  border-2 rounded-xl p-5 m-2 border-gray-100 bg-gray-100 text-gray-800">
              <span className="font-bold text-3xl">{newUsersCount}</span>
              <h2>New Users</h2>
              <span>This month</span>
              <FaUserPlus className="mr-2  mt-auto text-3xl" />
            </div>
            <div className="flex flex-col border-2 rounded-xl p-5 m-2 border-gray-100 bg-gray-100 text-gray-800">
              <span className="font-bold text-3xl">{verifiedCount}</span>
              <h2 className="mb-3">Verified Users</h2>
              <span className="font-bold text-3xl">{unverifiedCount}</span>
              <h2>Unverified Users</h2>
            </div>
          </>
        )}
      </div>
      <div className="border-gray-400 border-b-2 mx-5">
        <button
          className={
            isStaff
              ? " text-gray-400  px-3 py-1 mx-1 rounded-sm"
              : " text-indigo-500 border-indigo-500 border-b-2 px-3 py-1 mx-1 rounded-sm"
          }
          onClick={() => dispatch(setTableContent(false))}
        >
          All Users
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
