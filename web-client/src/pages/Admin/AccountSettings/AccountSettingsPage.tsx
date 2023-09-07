import AccountContactNumberForm from "./components/AccountContactNumberForm";
import AccountEmailForm from "./components/AccountEmailForm";
import AccountPasswordForm from "./components/AccountPasswordForm";

interface AccountSettingsPageProps {
  placeholder?: string;
}

const AccountSettingsPage: React.FC<AccountSettingsPageProps> = () => {
  return (
    <div>
      <section className="mb-16">
        <div className="mb-3 text-sm">
          <h3 className="text-lg font-semibold">Update Email</h3>
        </div>
        <hr />
        <div className="mt-5">
          <AccountEmailForm />
        </div>
      </section>
      <section className="mb-10">
        <div className="mb-3 text-sm">
          <h3 className="text-lg font-semibold">Change Password</h3>
        </div>
        <hr />
        <div className="mt-5">
          <AccountPasswordForm />
        </div>
      </section>
      <section className="mb-10">
        <div className="mb-3 text-sm">
          <h3 className="text-lg font-semibold">Contact Number</h3>
        </div>
        <hr />
        <div className="mt-5">
          <AccountContactNumberForm />
        </div>
      </section>
    </div>
  );
};

export default AccountSettingsPage;
