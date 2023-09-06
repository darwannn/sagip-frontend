import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TUserResData } from "../../../../types/user";

import {
  useGetUserByTokenQuery,
  useUpdatePasswordMutation,
} from "../../../../services/accountQuery";

import { MdClose } from "react-icons/md";

import PasswordField from "../../../../components/PasswordField/PasswordField";

const AccountPasswordForm = () => {
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const { data: userData } = useGetUserByTokenQuery();
  const successMessageRef = useRef<HTMLDivElement | null>(null);

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

    if (userData) {
      const res = await updatePassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
        oldPassword: data.oldPassword,
      });
      console.log(res);

      if ("data" in res) {
        if (res.data.success) {
          setServerRes(res.data);
          /* navigate(`/admin/account-settings`); */
          reset({
            confirmPassword: "",
            password: "",
            oldPassword: "",
          });
          successMessageRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
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
    <div className="bg-white p-8 rounded-xl relative" ref={successMessageRef}>
      <button
        className="absolute top-4 right-4 hover:bg-gray-300 rounded  text-gray-500 cursor-pointer"
        onClick={() => {
          navigate("/admin/account-settings");
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

        <div className="w-full mt-5 ">
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
