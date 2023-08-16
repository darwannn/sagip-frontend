import NewPasswordForm from "./NewPasswordForm";

import AuthForm from "../../components/AuthForm/AuthForm";

const NewPasswordPage = () => {
  return (
    <AuthForm
      pageTitle="Create New Password"
      navigateTo="/forgot-password"
      component={<NewPasswordForm />}
    />
  );
};

export default NewPasswordPage;
