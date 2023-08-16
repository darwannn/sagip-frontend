import ForgotPasswordForm from "./ForgotPasswordForm";

import AuthForm from "../../components/AuthForm/AuthForm";

const ForgotPasswordPage = () => {
  return (
    <AuthForm
      pageTitle="Reset your Password"
      navigateTo="/login"
      component={<ForgotPasswordForm />}
    />
  );
};

export default ForgotPasswordPage;
