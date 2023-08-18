import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "../../../types/user";

import { useUpdatePasswordMutation } from "../../../services/accountQuery";

import { MdClose } from "react-icons/md";

import PasswordField from "../../../components/PasswordField/PasswordField";

type TProps = {
  userData?: User;
};

const AccountPasswordForm = ({ userData }: TProps) => {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<any>();

  const [
    updatePassword,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdatePasswordMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const SubmitUserPassword = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      oldPassword: data.oldPassword,
    };

    if (userData) {
      const res = await updatePassword({
        body,
      });
      console.log(res);

      if (res && "data" in res) {
        if (res.data.success) {
          setServerRes(res.data);
          /* navigate(`/account`); */
          reset({
            confirmPassword: "",
            password: "",
            oldPassword: "",
          });
        }
      } else {
        setServerRes(res.error);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitUserPassword(data);
  };

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <div className="bg-white p-8 rounded-xl relative">
      <button
        className="absolute top-4 right-4 hover:bg-gray-300 rounded  text-gray-500 cursor-pointer"
        onClick={() => {
          navigate("/account-settings");
        }}
      >
        <MdClose />
      </button>
      <div className="text-3xl font-bold">Update Password</div>
      {serverRes?.success && (
        <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {serverRes?.message}
        </div>
      )}
      <form className="flex flex-wrap">
        <PasswordField
          register={register}
          errors={errors}
          serverRes={serverRes}
          fieldName="oldPassword"
          fieldLabel="Current Password"
          passwordRequirement={false}
          style="account"
        />

        <PasswordField
          register={register}
          errors={errors}
          serverRes={serverRes}
          fieldName="password"
          fieldLabel="Password"
          passwordRequirement={true}
          style="account"
        />

        <PasswordField
          register={register}
          errors={errors}
          serverRes={serverRes}
          fieldName="confirmPassword"
          fieldLabel="Confirm Password"
          passwordRequirement={false}
          style="account"
        />

        <div className="w-full mt-5">
          <button
            className="w-full md:w-auto bg-indigo-500 text-white px-5 py-1 my-2 rounded disabled:bg-indigo-300"
            onClick={handleSubmit(onSubmit)}
            disabled={updateIsLoading}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountPasswordForm;
