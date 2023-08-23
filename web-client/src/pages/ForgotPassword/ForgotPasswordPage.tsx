import ForgotPasswordForm from "./ForgotPasswordForm";

import AuthForm from "../../components/Form/AuthForm";
import AuthFormHeader from "../../components/Form/AuthFormHeader";

const ForgotPasswordPage = () => {
  return (
    <AuthForm
      component={
        <>
          {" "}
          <AuthFormHeader
            title="Reset your Password"
            buttonAction="navigate"
            action="/login"
          />
          <ForgotPasswordForm />
        </>
      }
    />
  );
};

export default ForgotPasswordPage;
