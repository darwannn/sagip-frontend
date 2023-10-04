import { useGetUserByTokenQuery } from "../../../services/accountQuery";
import { BASE_IMAGE_URL } from "../../../api.config";

import MobileHeader from "../../../components/MobileHeader/MobileHeader";
import AccountSettingsList from "../../Mobile/AccountSettings/components/AccountSettingsList";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AccountSettingsPage = () => {
  const { data: user /* isLoading, error */ } = useGetUserByTokenQuery();
  const navigation = useNavigate();
  return (
    <div className="min-h-screen mx-auto">
      <MobileHeader>
        <div className="w-full">
          <div className="mb-3 flex items-center gap-3">
            <button
              className="p-1.5 bg-white text-gray-500 rounded-md"
              onClick={() => navigation(-1)}
            >
              <LuArrowLeft />
            </button>
            <h1 className="font-semibold">Settings</h1>
          </div>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <div className="text-sm">
              <p className="font-medium">{`${user?.firstname} ${user?.lastname}`}</p>
              <p className="">{user?.email}</p>
            </div>
            <div>
              <img
                src={`${BASE_IMAGE_URL}/user/${user?.profilePicture}`}
                className="rounded-full w-16 m-auto "
              />
            </div>
          </div>
        </div>
      </MobileHeader>
      <AccountSettingsList />
    </div>
  );
};

export default AccountSettingsPage;
