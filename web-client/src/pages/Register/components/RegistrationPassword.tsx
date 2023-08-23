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

import PasswordField from "../../../components/PasswordField/PasswordField";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import { TUserResData } from "../../../types/user";

type TProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

const RegistrationPassword = ({ register, handleSubmit, errors }: TProps) => {
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
    const body = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const res = await validate({
      body,
      action: "password",
    });

    console.log("res");
    console.log(res);
    if (res && "data" in res) {
      if (res.data.success) {
        dispatch(setDisplayedRegisterPage("personal-info"));
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
        title="Create your password"
        buttonAction="dispatch"
        action="email"
        target="register"
      />
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <PasswordField
          register={register}
          errors={errors}
          serverRes={serverRes}
          fieldName="password"
          fieldLabel="Password"
          passwordRequirement={true}
          style="auth"
        />

        <PasswordField
          register={register}
          errors={errors}
          serverRes={serverRes}
          fieldName="confirmPassword"
          fieldLabel="Confirm Password"
          passwordRequirement={false}
          style="auth"
        />
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

export default RegistrationPassword;
