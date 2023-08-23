import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { setAuthToken } from "../../../util/auth";
import { AuthResponse } from "../../../types/auth";
import { useRegisterMutation } from "../../../services/authQuery";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";

import moment from "moment";
import { TUserResData, User } from "../../../types/user";

type TProps = {
  register: UseFormRegister<FieldValues>;

  errors: FieldErrors<FieldValues>;

  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

const RegisterContactNumber = ({ register, handleSubmit, errors }: TProps) => {
  /* const dispatch = useAppDispatch(); */
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [
    registration,
    {
      isError: registerIsError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterMutation();

  const SubmitData = async (data: FieldValues) => {
    /*    if (!isDirty) {
      console.log("No changes made");
      return;
    } */

    const body: Partial<User> = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
      gender: data.gender,

      password: data.password,
      confirmPassword: data.confirmPassword,

      email: data.email,
      contactNumber: data.contactNumber,

      region: data.region,
      province: data.province,
      municipality: data.municipality,
      barangay: data.barangay,
      street: data.street,
    };

    const res = await registration(body);
    console.log(res);

    if (res && "data" in res) {
      console.log(res);
      const resData: AuthResponse = res.data;
      if (resData.success) {
        setServerRes(res.data);
        setAuthToken({
          token: resData.token || "",
        });
        navigate("/register/contact-verification");
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    }
  };

  const onValidate: SubmitHandler<FieldValues> = async (data) => {
    SubmitData(data);
  };

  if (registerIsLoading) console.log("Registering...");
  if (registerIsError) console.log("Registration Error");
  if (registerIsSuccess) console.log("Registered successfully");
  return (
    <>
      <AuthFormHeader
        title="Contact Information"
        buttonAction="dispatch"
        action="address"
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
        onClick={handleSubmit(onValidate)}
        disabled={registerIsLoading}
      >
        Next
      </button>
    </>
  );
};

export default RegisterContactNumber;
