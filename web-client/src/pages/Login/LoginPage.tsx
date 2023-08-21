import { ActionFunction, redirect } from "react-router-dom";

// Types
import { AuthResponse } from "../../types/auth";

import { API_BASE_URL } from "../../api.config";
import { setAuthToken } from "../../util/auth";

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
/* const navigate = useNavigate(); */
// LOGIN ACTION
// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  // Gets the data from the login form.
  const data = await request.formData();
  const loginData = {
    identifier: data.get("identifier"),
    password: data.get("password"),
  };

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: { "Content-Type": "application/json" },
  });
  console.log("resData");
  console.log(res);
  const resData: AuthResponse = await res.json();

  if (!res.ok) {
    console.log("Login Error");
    return resData;
  }
  // Manage token here
  setAuthToken({
    token: resData.token || "",
  });
  if (resData.message.includes("attempt")) {
    /* navigate("/login/contact-verification"); */
  }

  if (resData.message.includes("verify")) {
    /* navigate("/register/contact-verification"); */
  }
  return redirect("/");
};
