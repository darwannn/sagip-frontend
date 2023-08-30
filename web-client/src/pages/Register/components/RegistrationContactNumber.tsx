import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

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

const RegistrationContactNumber = ({
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
        title="Contact Information"
        buttonAction="dispatch"
        action="address"
        target="register"
      />
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="contactNumber" className=" text-md  text-gray-500">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="Contact Number"
            maxLength={11}
            {...register("contactNumber")}
          />
          {(errors.contactNumber || !serverRes?.success) && (
            <span className="text-red-500">
              {errors.contactNumber
                ? "Contact Number is required"
                : serverRes?.contactNumber}
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

export default RegistrationContactNumber;
