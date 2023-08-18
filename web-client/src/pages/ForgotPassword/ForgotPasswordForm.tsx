import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setAuthToken } from "../../util/auth";
import { AuthResponse } from "../../types/auth";

import { useForgotPasswordMutation } from "../../services/authQuery";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<any>();
  const [
    forgotPassword,
    { isError: isError, isLoading: isLoading, isSuccess: isSuccess },
  ] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const SubmitUserPassword = async (data: FieldValues) => {
    const body = {
      identifier: data.identifier,
    };

    const res = await forgotPassword({
      body,
    });

    if (res && "data" in res) {
      const resData: AuthResponse = res.data;
      setServerRes(res.data);
      if (resData.success) {
        setAuthToken({
          token: resData.token || "",
        });

        navigate("/forgot-password/contact-verification");
      }
    } else {
      setServerRes(res.error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitUserPassword(data);
  };

  if (isLoading) console.log("Sending verification code");
  if (isError) console.log("Error sending verification code");
  if (isSuccess) console.log("Sent verification code successfully");
  return (
    <>
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="identifier" className=" text-md  text-gray-500">
            Email Address or Contact Number
          </label>
          <input
            type="text"
            id="identifier"
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
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        Proceed
      </button>
    </>
  );
};

export default ForgotPasswordForm;
