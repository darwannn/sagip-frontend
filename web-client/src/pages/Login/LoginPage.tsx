import LoginForm from "./LoginForm";

import AuthForm from "../../components/Form/AuthForm";
import AuthFormHeader from "../../components/Form/AuthFormHeader";

const LoginPage = () => {
  return (
    <AuthForm
      component={
        <>
          <AuthFormHeader title="Login" buttonAction="navigate" action="/" />
          <LoginForm />
        </>
      }
    />
  );
};

export default LoginPage;
