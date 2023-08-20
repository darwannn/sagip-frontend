import NewPasswordForm from "./NewPasswordForm";

import AuthForm from "../../components/Form/AuthForm";
import AuthFormHeader from "../../components/Form/AuthFormHeader";

const NewPasswordPage = () => {
  return (
    <AuthForm
      component={
        <>
          <AuthFormHeader
            title="Create New Password"
            buttonAction="navigate"
            action="/forgot-password"
          />
          <NewPasswordForm />
        </>
      }
    />
  );
};

export default NewPasswordPage;
