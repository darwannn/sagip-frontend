import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AuthResponse } from "../../types/auth";

const LoginForm = () => {
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

  /**
   * <Form> component from react-router-dom is used to submit the form.
   * It will automatically call the action function specified in the router.
   * In this case, it will call the loginAction function.
   */
  return (
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
      {actionData && actionData.password && <span>{actionData.password}</span>}
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
  );
};

export default LoginForm;
