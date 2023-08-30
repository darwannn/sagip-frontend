import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { setAuthToken } from "../../util/auth";
import { AuthResponse } from "../../types/auth";

import { useLoginMutation } from "../../services/authQuery";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TUserResData } from "../../types/user";

import PasswordField from "../../components/PasswordField/PasswordField";

const LoginForm = () => {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const isMobileDevice = /Mobi|iPhone|Android/i.test(navigator.userAgent);

  const newPasswordRes = useAppSelector((state) => state.auth.newPasswordRes);
  const deleteAccountRes = useAppSelector(
    (state) => state.account.deleteAccountRes
  );

  const [
    login,
    { isError: isError, isLoading: isLoading, isSuccess: isSuccess },
  ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const SubmitLogin = async (data: FieldValues) => {
    const res = await login({
      identifier: data.identifier,
      password: data.password,
    });

    console.log(res);
    if ("data" in res) {
      const resData: AuthResponse = res.data;
      setServerRes(res.data);
      setAuthToken({
        token: resData.token || "",
      });
      if (resData.success) {
        navigate("/");
      }
      if (resData.message.includes("attempt")) {
        navigate("/login/contact-verification");
      }

      if (resData.message.includes("verify")) {
        navigate("/register/contact-verification");
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;

        setServerRes(errData);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitLogin(data);
  };

  if (isLoading) console.log("Submitting...");
  if (isError) console.log("Error Login");
  if (isSuccess) console.log("Login successfully");
  return (
    <>
      {/* display success message from newPassword or account deletion */}
      {newPasswordRes ||
        deleteAccountRes ||
        (serverRes && !serverRes.message.includes("input error") && (
          <div
            className={`mt-3 p-2 rounded-md text-center ${
              newPasswordRes || deleteAccountRes
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {newPasswordRes &&
              "Password changed successfully. You can now login with your new password."}
            {deleteAccountRes &&
              "Account deleted. You have 30 days to login and recover your account."}
            {serverRes?.message}
          </div>
        ))}

      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="identifier" className=" text-md  text-gray-500">
            Email Address or Contact Number:
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Email Address or Contact Number"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            {...register("identifier", { required: true })}
          />
          {(errors.identifier || !serverRes?.success) && (
            <span className="text-red-500">
              {errors.identifier
                ? "This field is required"
                : serverRes?.identifier}
            </span>
          )}
        </div>
        <div className=" my-3">
          <PasswordField
            register={register}
            errors={errors}
            serverRes={serverRes}
            fieldName="password"
            fieldLabel="Password"
            passwordRequirement={false}
            style="auth"
          />

          <Link
            to={"/forgot-password"}
            className="block text-md  text-gray-500 underline hover:text-gray-700 mt-1"
          >
            I forgot my password
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      {isMobileDevice && (
        <Link
          to={"/register"}
          className="block text-md text-center text-gray-500 underline hover:text-gray-700 my-2"
        >
          or Sign up instead
        </Link>
      )}
    </>
  );
};

export default LoginForm;
