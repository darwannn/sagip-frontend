import { useState } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { TUserResData } from "../../types/user";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type TProps = {
  register: UseFormRegister<FieldValues>;
  style: string;
  errors: FieldErrors<FieldValues>;
  fieldName: string;
  fieldLabel: string;
  serverRes: TUserResData | undefined;
  passwordRequirement: boolean;
};

const PasswordField: React.FC<TProps> = ({
  register,
  errors,
  fieldName,
  fieldLabel,
  serverRes,
  passwordRequirement,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [areRequirementsMet, setAreRequirementsMet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (value: string) => {
    const requirements = [
      value.length >= 8 && value.length <= 20,
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /\d/.test(value),
      /[@.#$%^&,*]/.test(value),
    ];

    const allRequirementsMet = requirements.every((req) => req);
    setAreRequirementsMet(allRequirementsMet);
    setIsTyping(true);
  };

  return (
    <div
      className={
        style === "auth" || style === "account-delete"
          ? "my-3"
          : "flex flex-col mt-5 p-2 w-full  lg:w-1/2 xl:w-1/3"
      }
    >
      <label
        htmlFor={fieldName}
        className={
          style === "account" || style === "account-delete"
            ? ""
            : "text-md  text-gray-500"
        }
      >
        {fieldLabel}
      </label>
      <div className="flex items-center relative">
        <input
          type={showPassword ? "text" : "password"}
          id={fieldName}
          className={
            style === "account" || style === "account-delete"
              ? "border p-1 w-full"
              : "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
          }
          placeholder={fieldLabel}
          {...register(fieldName, { required: true })}
          onInput={(e) => {
            const inputElement = e.target as HTMLInputElement;
            validatePassword(inputElement.value);
          }}
        />
        <button
          type="button"
          className={
            style === "account" || style === "account-delete"
              ? "text-xl absolute right-2 text-gray-500 "
              : "text-xl absolute right-2 text-gray-500 bg-gray-200"
          }
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>

      {(errors[fieldName] || !serverRes?.success) && (
        <span className="text-red-500">
          {errors[fieldName]
            ? `${fieldLabel} is required`
            : (!passwordRequirement || areRequirementsMet) &&
              serverRes?.[fieldName]}
        </span>
      )}

      {/* password requirment will be hidden once it is met */}
      {!areRequirementsMet &&
        passwordRequirement &&
        (!areRequirementsMet || isTyping) && (
          /*  password requirement will turn red if user is typing and while requirements are not met */
          <div
            className={`text-xs mt-2 ${
              isTyping ? "text-red-500" : "text-gray-400"
            }`}
          >
            Your password must be 8-20 characters long and contain a combination
            of capital and lowercase letters, numbers, and symbols.
          </div>
        )}
    </div>
  );
};

export default PasswordField;
