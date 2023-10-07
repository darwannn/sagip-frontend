import { useState, useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TUserResData } from "../../../../types/user";

import {
  useGetUserByTokenQuery,
  useUpdatePasswordMutation,
} from "../../../../services/accountQuery";

import PasswordField from "../../../../components/PasswordField/PasswordField";
import { LoaderSpin } from "../../../../components/Loader/Loader";

const AccountPasswordForm = () => {
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
    <div className="" ref={successMessageRef}>
      {serverRes?.success && (
        <div className="w-full text-xs md:text-sm bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {serverRes?.message}
        </div>
      )}
      <form className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
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

        <div className="w-full lg:w-auto text-xs md:text-sm">
          <button
            className="btn-primary w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={updateIsLoading || !isDirty}
          >
            {updateIsLoading ? (
              <>
                <LoaderSpin /> Updating Password
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountPasswordForm;
