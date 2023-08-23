import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

import { useAppDispatch } from "../../../store/hooks";

import { setDisplayedRegisterPage } from "../../../store/slices/authSlice";

import AddressField from "../../../components/AddressSelector/AddressField";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";

type TProps = {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
};

const RegistrationAddress = React.memo(
  ({ register, handleSubmit, errors, setValue, getValues }: TProps) => {
    const dispatch = useAppDispatch();
    const [inMalolos, setInMalolos] = useState<boolean>(false);
    const formInMalolos = getValues("inMalolos");

    const toggleInMalolos = () => {
      setInMalolos((prevState) => !prevState);
    };

    const onValidate: SubmitHandler<FieldValues> = async () => {
      dispatch(setDisplayedRegisterPage("contact"));
    };
    useEffect(() => {
      setInMalolos(formInMalolos);
    }, [formInMalolos]);

    return (
      <>
        <AuthFormHeader
          title="Residential Information"
          buttonAction="dispatch"
          action="personal"
          target="register"
        />
        <div className="mb-10 flex-1 sm:flex-grow-0">
          <div className="my-3">
            <label>
              <input
                type="checkbox"
                onInput={toggleInMalolos}
                {...register("inMalolos")}
              />
              In Malolos
            </label>
          </div>

          <AddressField
            inMalolos={inMalolos}
            style="auth"
            getValues={getValues}
            {...{
              register,
              errors,
              setValue,
            }}
          />
        </div>

        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
          onClick={handleSubmit(onValidate)}
        >
          Next
        </button>
      </>
    );
  }
);

export default RegistrationAddress;
