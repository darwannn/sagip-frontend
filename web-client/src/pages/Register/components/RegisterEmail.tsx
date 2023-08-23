import { useState } from "react";

import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { useAppDispatch } from "../../../store/hooks";
import { setDisplayedRegisterPage } from "../../../store/slices/authSlice";
import { useValidataInputMutation } from "../../../services/authQuery";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import { TUserResData } from "../../../types/user";

type TProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

const RegisterEmail = ({ register, handleSubmit, errors }: TProps) => {
  const dispatch = useAppDispatch();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [
    validate,
    {
      isError: validateIsError,
      isLoading: validateIsLoading,
      isSuccess: validateIsSuccess,
    },
  ] = useValidataInputMutation();

  const ValidateData = async (data: FieldValues) => {
    /* if (!isDirty) {
      console.log("No changes made");
      return;
    } */

    const body = {
      email: data.email,
    };

    const res = await validate({
      body,
      action: "email",
    });

    console.log("res");
    console.log(res);
    if ("data" in res) {
      if (res.data.success) {
        dispatch(setDisplayedRegisterPage("password"));
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    }
  };

  const onValidate: SubmitHandler<FieldValues> = async (data) => {
    ValidateData(data);
  };

  if (validateIsLoading) console.log("Validating...");
  if (validateIsError) console.log("Error Validating");
  if (validateIsSuccess) console.log("Validated successfully");

  return (
    <>
      <AuthFormHeader
        title="Enter your email address"
        buttonAction="navigate"
        action="/s"
      />
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="email" className=" text-md  text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="Email"
            {...register("email", { required: true })}
          />

          {(errors.email || !serverRes?.success) && (
            <span className="text-red-500">
              {errors.email ? "Email is required" : serverRes?.email}
            </span>
          )}
        </div>
      </div>

      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={handleSubmit(onValidate)}
        disabled={validateIsLoading}
      >
        Next
      </button>
    </>
  );
};

export default RegisterEmail;
