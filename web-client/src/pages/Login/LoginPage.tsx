import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

// REDUX
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";

// Types
import { AuthResponse } from "../../types/auth";

import { API_BASE_URL } from "../../api.config";
import { setAuthToken } from "../../util/auth";

const LoginPage = () => {
  // Redux
  const dispatch = useAppDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // const onSubmitFormHandler = async (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${API_BASE_URL}/auth/login`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         identifier: username,
  //         password: password,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       console.log(errorData);
  //       throw new Error(errorData.message);
  //     }
  //     const data = await res.json();
  //     console.log(data);
  //     dispatch(
  //       login({
  //         token: data.token,
  //         user: {
  //           for: data.user.for,
  //           id: data.user.id,
  //           status: data.user.status,
  //           userType: data.user.userType,
  //         },
  //       })
  //     );
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error);
  //     // Handle error here, such as displaying an error message to the user
  //   }
  //   /**
  //    * TODO: Redirect user after logging in
  //    * - redirect('/') is not working here
  //    * I think it only works on 'loader' and 'action' functions
  //    * of RRDv6
  //    */
  // };

  return (
    <>
      <h1>Login Page</h1>
      <Form method="POST" className="flex flex-col w-min gap-2">
        <label htmlFor="identifier">Identifier:</label>
        <input
          name="identifier"
          id="identifier"
          type="text"
          className="border"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
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

export const loginAction = async ({ request }: { request: Request }) => {
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
    console.log("Error: ");
    console.log(resData);
    return resData;
  }

  // Manage token here
  setAuthToken({
    token: resData.token || "",
    user: resData.user || { for: "", id: "", status: "", userType: "" },
  });

  return redirect("/");
};
