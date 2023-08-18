import {
  ActionFunction,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";

// Types
import { AuthResponse } from "../../types/auth";

import { API_BASE_URL } from "../../api.config";
import { setAuthToken } from "../../util/auth";

import LoginForm from "./LoginForm";

import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
  return (
    <AuthForm pageTitle="Login" navigateTo="/" component={<LoginForm />} />
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
  return redirect("/");
};
