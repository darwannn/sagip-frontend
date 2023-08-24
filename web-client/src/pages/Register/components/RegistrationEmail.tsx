import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { TUserResData } from "../../../types/user";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";

type TProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  serverRes: TUserResData | undefined;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  onLoading: boolean;
};

const RegistrationEmail = ({
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
        title="Enter your email address"
        buttonAction="navigate"
        action="/login"
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
        onClick={handleSubmit(onSubmit)}
        disabled={onLoading}
      >
        Next
      </button>
    </>
  );
};

export default RegistrationEmail;
