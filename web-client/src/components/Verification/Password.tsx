import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setPasswordVerificationRes } from "../../store/slices/authSlice";
import { usePasswordVerificationMutation } from "../../services/authQuery";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "../../components/PasswordField/PasswordField";
type TProps = {
  action: string;
};
const Password = ({ action }: TProps) => {
  const dispatch = useAppDispatch();
  const [serverResponse, setServerResponse] = useState<any>();

  const [
    passwordVerification,
    {
      isError: deleteIsError,
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
    },
  ] = usePasswordVerificationMutation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>();

  const SubmitUserPassword = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body = {
      password: data.password,
    };

    const res = await passwordVerification({
      body,
      action,
    });

    if (res && "data" in res) {
      setServerResponse(res);
      if (res.data.success) {
        dispatch(setPasswordVerificationRes(res.data));
      }
    } else {
      setServerResponse(res.error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitUserPassword(data);
  };

  if (deleteIsLoading) console.log("Updating...");
  if (deleteIsError) console.log("Error updating");
  if (deleteIsSuccess) console.log("Deleted successfully");

  return (
    <>
      <form>
        <>
          <PasswordField
            register={register}
            errors={errors}
            serverResponse={serverResponse}
            fieldName="password"
            fieldLabel="Password"
            passwordRequirement={false}
            style="account-delete"
          />
        </>
        <button
          className="w-full bg-red-500 text-white  px-5 py-1 my-2 rounded"
          onClick={handleSubmit(onSubmit)}
          disabled={deleteIsLoading}
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default Password;
