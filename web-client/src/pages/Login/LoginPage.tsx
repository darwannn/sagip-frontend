import { useState } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

// Types
import { AuthResponse } from "../../types/auth";

import { API_BASE_URL } from "../../api.config";
import { setAuthToken } from "../../util/auth";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  /**
   * This is a temporary workaround for the issue
   * as useActionData / useLoaderData currently doesnt support generic types.
   * MORE INFO: https://github.com/remix-run/react-router/discussions/9792
   */
  const actionData = useActionData() as AuthResponse;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1>Login Page</h1>
      <Form method="POST" className="flex flex-col w-min gap-2">
        <label htmlFor="identifier">Identifier:</label>
        {actionData && actionData.identifier && (
          <span>{actionData.identifier}</span>
        )}
        <input
          name="identifier"
          id="identifier"
          type="text"
          className="border"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        {actionData && actionData.password && (
          <span>{actionData.password}</span>
        )}
        <input
          name="password"
          id="password"
          type="password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 px-2 py-1 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </Form>
    </>
  );
};

export default LoginPage;

/**
 * Login Action
 */
// eslint-disable-next-line react-refresh/only-export-components
export const loginAction: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
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
