import { useState } from "react";

// REDUX
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";

import { API_BASE_URL } from "../../api.config";

const LoginPage = () => {
  // Redux
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitFormHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Form submitted");

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    dispatch(
      login({
        token: data.token,
        user: {
          for: data.user.for,
          id: data.user.id,
          status: data.user.status,
          userType: data.user.userType,
        },
      })
    );
  };

  return (
    <>
      <h1>Login Page</h1>
      <form
        onSubmit={onSubmitFormHandler}
        className="flex flex-col w-min gap-2"
      >
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          className="border"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username">Password:</label>
        <input
          type="password"
          className="border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-indigo-500 px-2 py-1 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;
