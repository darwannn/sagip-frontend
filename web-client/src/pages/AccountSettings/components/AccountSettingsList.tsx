import { useNavigate, useParams } from "react-router-dom";

import { User } from "../../../types/user";

import AccountDelete from "./AccountDelete";

type TProps = {
  userData?: User;
};
const AccountSettingsList = ({ userData }: TProps) => {
  const navigate = useNavigate();
  const { page } = useParams();

  return (
    <>
      <div className="flex flex-col py-5  h-screen w-full md:w-[300px] bg-white sticky top-0 shadow-md ">
        <h1 className="text-xl font-bold my-5 ml-5">Account Settings</h1>
        {/* shows if email is not yet verified */}
        {userData?.status === "unverified" && (
          <div className="bg-red-400 text-white px-5 py-3 my-5  text-center rounded">
            <span className="mr-2">
              Account not verified yet. Please Verify
            </span>
          </div>
        )}
        <hr className="border border-gray-200" />
        <div
          /* highlight the current displayed component */
          className={` ${
            page === "profile" && "font-semibold text-indigo-600"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("/account-settings/profile")}
        >
          Profile
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "contact-number" && "font-semibold text-indigo-600"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("/account-settings/contact-number")}
        >
          Contact Number
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "email" && "font-semibold text-indigo-600"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("/account-settings/email")}
        >
          Email{" "}
          <div className="flex items-center">
            {userData?.emailStatus !== "unverified" && (
              <div className="rounded-xl bg-red-300  px-3 py-1 text-xs mr-1 cursor-pointer font-normal text-black">
                Unverified
              </div>
            )}
          </div>
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "password" && "font-semibold text-indigo-600"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("/account-settings/password")}
        >
          Password
        </div>
        <hr className="border border-gray-200" />
        <div className=" mt-auto p-5">
          <AccountDelete />
        </div>
      </div>
    </>
  );
};

export default AccountSettingsList;
