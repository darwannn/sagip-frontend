import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import { AuthResponse } from "../../types/auth";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [serverRes, setServerRes] = useState<any>(null);

  const newPasswordRes = useAppSelector((state) => state.auth.newPasswordRes);
  const deleteAccountRes = useAppSelector(
    (state) => state.account.deleteAccountRes
  );

  console.log(newPasswordRes);

  const actionData = useActionData() as AuthResponse;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" className="flex flex-col w-full h-full">
      {/* display success message from newPassword or account deletion */}

      {(newPasswordRes || deleteAccountRes || serverRes) && (
        <div
          className={`p-2 rounded-md text-center ${
            newPasswordRes || deleteAccountRes
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {newPasswordRes?.message}
          {deleteAccountRes &&
            "Account deleted. You have 30 days to login and recover your account."}
          {serverRes?.message}
        </div>
      )}

      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="identifier" className=" text-md  text-gray-500">
            Email Address or Contact Number:
          </label>
          {actionData && actionData.identifier && (
            <span>{actionData.identifier}</span>
          )}
          <input
            name="identifier"
            id="identifier"
            type="text"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className=" my-3">
          <label htmlFor="password" className="text-md  text-gray-500">
            Password:
          </label>
          {actionData && actionData.password && (
            <span>{actionData.password}</span>
          )}
          <input
            name="password"
            id="password"
            type="password"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            to={"/forgot-password"}
            className="text-md  text-gray-500 underline hover:text-gray-700"
          >
            I forgot my password
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>

      <Link
        to={"/forgot-password"}
        className="block sm:hidden text-md text-center text-gray-500 underline hover:text-gray-700 my-2"
      >
        or Sign up instead
      </Link>
    </Form>
  );
};

export default LoginForm;
