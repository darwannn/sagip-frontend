import { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

import AddressField from "../../../components/AddressSelector/AddressField";

type TProps = {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: FieldErrors<FieldValues>;
  /* serverRes: TUserResData | undefined; */
  onSubmit: SubmitHandler<FieldValues>;
  onLoading: boolean;
};

const RegistrationAddress = ({
  register,
  handleSubmit,
  errors,
  setValue,
  getValues,
  /* serverRes, */
  onSubmit,
  onLoading,
}: TProps) => {
  const [inMalolos, setInMalolos] = useState<boolean>(false);
  const formInMalolos = getValues("inMalolos");

  const toggleInMalolos = () => {
    setInMalolos((prevState) => !prevState);
  };

  useEffect(() => {
    setInMalolos(formInMalolos);
  }, [formInMalolos]);

  return (
    <>
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
        onClick={handleSubmit(onSubmit)}
        disabled={onLoading}
      >
        Next
      </button>
    </>
  );
};

export default RegistrationAddress;
