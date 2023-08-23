import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { useAppDispatch } from "../../../store/hooks";
import { setDisplayedRegisterPage } from "../../../store/slices/authSlice";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";

type TProps = {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
};

const RegisterPersonalInfo = ({ register, handleSubmit, errors }: TProps) => {
  const dispatch = useAppDispatch();

  const onValidate: SubmitHandler<FieldValues> = async () => {
    dispatch(setDisplayedRegisterPage("address"));
  };

  return (
    <>
      <AuthFormHeader
        title="Personal Information"
        buttonAction="dispatch"
        action="password"
      />

      {/*  <div className="flex flex-wrap "> */}
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="my-3">
          <label htmlFor="firstname" className=" text-md  text-gray-500">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="First Name"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-red-500">First Name is required</span>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="middlename" className=" text-md  text-gray-500">
            Middle Name
          </label>
          <input
            type="text"
            id="middlename"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="Middle Name"
            {...register("middlename", { required: true })}
          />
          {errors.middlename && (
            <span className="text-red-500">Middle Name is required</span>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="lastname" className=" text-md  text-gray-500">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="Last Name"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-red-500">Last Name is required</span>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="birthdate" className=" text-md  text-gray-500">
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            className="w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
            placeholder="Birthdate"
            {...register("birthdate", { required: true })}
          />
          {errors.birthdate && (
            <span className="text-red-500">Birthdate is required</span>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="gender" className=" text-md  text-gray-500">
            Gender
          </label>
          <div>
            <label htmlFor="male" className="mr-3">
              <input
                type="radio"
                className="mr-1"
                id="male"
                value="Male"
                {...register("gender", { required: true })}
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                className="mr-1"
                id="female"
                value="Female"
                {...register("gender", { required: true })}
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
        </div>
      </div>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={handleSubmit(onValidate)}
      >
        Next
      </button>
      {/* </div> */}
    </>
  );
};

export default RegisterPersonalInfo;
