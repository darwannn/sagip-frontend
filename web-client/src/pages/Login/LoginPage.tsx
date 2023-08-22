import { ActionFunction, redirect } from "react-router-dom";

// Types
import { AuthResponse } from "../../types/auth";

import { API_BASE_URL } from "../../api.config";
import { setAuthToken } from "../../util/auth";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <h1>Login Page</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;

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
  const resData: AuthResponse = await res.json();

  if (!res.ok) {
    console.log("Login Error");
    return resData;
  }

  // Manage token here
  setAuthToken({
    token: resData.token || "",
    user: resData.user || { for: "", id: "", status: "", userType: "" },
  });

  return redirect("/");
};
