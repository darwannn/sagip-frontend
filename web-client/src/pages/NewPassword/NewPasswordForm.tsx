import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { setNewPasswordRes } from "../../store/slices/authSlice";
import { useNewPasswordMutation } from "../../services/authQuery";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "../../components/PasswordField/PasswordField";

const NewPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<any>();
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
    const body = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      for: "new-password",
    };

    const res = await newPassword({
      body,
    });

    if (res && "data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        dispatch(setNewPasswordRes(res.data));
        navigate("/login");
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
