import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import PasswordField from "../../../components/PasswordField/PasswordField";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import { TUserResData } from "../../../types/user";

type TProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  serverRes: TUserResData | undefined;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  onLoading: boolean;
};

const RegistrationPassword = ({
  register,
  handleSubmit,
  errors,
  serverRes,
  onSubmit,
  onLoading,
}: TProps) => {
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
        onClick={handleSubmit(onSubmit)}
        disabled={onLoading}
      >
        Next
      </button>
    </>
  );
};

export default RegistrationPassword;
