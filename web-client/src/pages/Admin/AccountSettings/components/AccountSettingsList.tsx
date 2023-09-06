import { useNavigate, useParams } from "react-router-dom";

import { User } from "../../../../types/user";

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

        <hr className="border border-gray-200" />
        <div
          /* highlight the current displayed component */
          className={` ${
            page === "profile" && "font-semibold text-black"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("profile")}
        >
          Profile
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "contact-number" && "font-semibold text-black"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("contact-number")}
        >
          Contact Number
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "email" && "font-semibold text-black"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("email")}
        >
          Email{" "}
          <div className="flex items-center">
            {userData?.emailStatus === "unverified" && (
              <div className="rounded-xl bg-red-400 text-white px-3 py-1 text-xs mr-1 cursor-pointer font-normal ">
                Unverified
              </div>
            )}
          </div>
        </div>
        <hr className="border border-gray-200" />
        <div
          className={` ${
            page === "password" && "font-semibold text-black"
          } flex justify-between items-center rounded-md py-2 px-5 cursor-pointer `}
          onClick={() => navigate("password")}
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
