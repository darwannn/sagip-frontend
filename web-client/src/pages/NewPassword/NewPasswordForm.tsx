import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { setNewPasswordRes } from "../../store/slices/authSlice";
import { useNewPasswordMutation } from "../../services/authQuery";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TUserResData } from "../../types/user";

import PasswordField from "../../components/PasswordField/PasswordField";

const NewPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [
    newPassword,
    { isError: isError, isLoading: isLoading, isSuccess: isSuccess },
  ] = useNewPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const SubmitUserPassword = async (data: FieldValues) => {
    const res = await newPassword({
      password: data.password,
      confirmPassword: data.confirmPassword,
      target: "new-password",
    });

    if ("data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        dispatch(setNewPasswordRes(res.data));
        navigate("/login");
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
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
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        Submit
      </button>
    </>
  );
};

export default NewPasswordForm;
