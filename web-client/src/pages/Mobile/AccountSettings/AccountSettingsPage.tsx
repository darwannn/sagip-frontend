import { useGetUserByTokenQuery } from "../../../services/accountQuery";
import { BASE_IMAGE_URL } from "../../../api.config";

import MobileHeader from "../../../components/MobileHeader/MobileHeader";
import AccountSettingsList from "../../Mobile/AccountSettings/components/AccountSettingsList";

const AccountSettingsPage = () => {
  const { data: user /* isLoading, error */ } = useGetUserByTokenQuery();
  return (
    <div className="min-h-screen mx-auto">
      <MobileHeader
        component={
          <>
            <img
              src={`${BASE_IMAGE_URL}/user/${user?.profilePicture}`}
              className="rounded-full w-20 m-auto"
            />
          </>
        }
      />
      <AccountSettingsList />
    </div>
  );
};

export default AccountSettingsPage;
