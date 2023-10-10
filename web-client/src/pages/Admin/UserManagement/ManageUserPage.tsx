import UserTable from "./components/UserTable";
// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTableContent } from "../../../store/slices/userManageSlice";

import UserStatistics from "./components/UserStatistics";

const ManageUserPage = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isStaff = useAppSelector((state) => state.userManage.isStaff);

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col">
      <div className="">
        <h1 className="text-2xl font-bold text-primary-500">Manage Users</h1>
        <p className="text-sm">
          Manage user accounts, access levels, and verify resident accounts
        </p>
      </div>
      <hr className="my-5" />
      <div className="flex flex-row gap-2 p-2 bg-slate-100 shadow-inner w-max rounded text-sm">
        <button
          className={`py-2 px-3 rounded 
        ${isStaff ? "text-gray-400" : "bg-primary-500 text-white"}
        `}
          onClick={() => dispatch(setTableContent(false))}
        >
          Residents
        </button>
        <button
          className={`py-2 px-5 rounded 
        ${isStaff ? "bg-primary-500 text-white" : "text-gray-400"}
        `}
          onClick={() => dispatch(setTableContent(true))}
        >
          Staffs
        </button>
      </div>
      <UserStatistics />
      <UserTable />
    </div>
  );
};

export default ManageUserPage;
