import { useGetUserByTokenQuery } from "../../../services/accountQuery";
import { BASE_IMAGE_URL } from "../../../api.config";

import MobileHeader from "../../../components/MobileHeader/MobileHeader";
import AccountSettingsList from "../../Mobile/AccountSettings/components/AccountSettingsList";

const AccountSettingsPage = () => {
  const { data: user /* isLoading, error */ } = useGetUserByTokenQuery();
  return (
    <div className="min-h-screen mx-auto">
      <MobileHeader>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div>
            <img
              src={`${BASE_IMAGE_URL}/user/${user?.profilePicture}`}
              className="rounded-full w-16 m-auto outline outline-4 outline-white"
            />
          </div>
          <div className="text-sm text-center">
            <p className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</p>
            <p className="">{user?.email}</p>
          </div>
        </div>
      </MobileHeader>
      <AccountSettingsList />
    </div>
  );
};

export default AccountSettingsPage;
