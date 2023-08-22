import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { setAuthToken } from "../../util/auth";
import { AuthResponse } from "../../types/auth";

import type { Token } from "../../types/auth";
import jwtDecode from "jwt-decode";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { setcontactVerificationRes } from "../../store/slices/authSlice";

import {
  useContactVerificationMutation,
  useResendVerificationCodeMutation,
} from "../../services/authQuery";

import VerificationInput from "react-verification-input";

type TProps = {
  action: string;
  navigateTo: string;
};

const ContactVerification = ({ action, navigateTo }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<Token>(token || "");
  const identifier =
    action != "forgot-password" && action != "register"
      ? useAppSelector((state) => state.auth.identifier)
      : decodedToken.identifier;

  const [serverRes, setServerRes] = useState<any>();
  const [resendCountdown, setResendCountdown] = useState(10);

  const [
    contactVerification,
    {
      isError: verifyIsError,
      isLoading: verifyIsLoading,
      isSuccess: verifyIsSuccess,
    },
  ] = useContactVerificationMutation();

  const [
    resendVerificationCode,
    {
      isError: resendIsError,
      isLoading: resendIsLoading,
      isSuccess: resendIsSuccess,
    },
  ] = useResendVerificationCodeMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      code: "",
    },
  });

  const SubmitVerificationCode = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body = {
      code: data.code,
      contactNumber: identifier,
      email: identifier,
    };

    const res = await contactVerification({
      body,
      action,
    });

    if (res && "data" in res) {
      setServerRes(res.data);
      const resData: AuthResponse = res.data;
      if (resData.success) {
        if (navigateTo !== "") {
          setAuthToken({
            token: resData.token || "",
          });
          navigate(navigateTo);
        } else {
          dispatch(setcontactVerificationRes(res.data));
        }
      }
    } else {
      setServerRes(res.error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitVerificationCode(data);
  };

  const resendCode = async () => {
    const body = {
      identifier: identifier,
    };
    const res = await resendVerificationCode({ body });
    if (res && "data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        setResendCountdown(10);
      }
    } else {
      setServerRes(res.error);
    }
  };

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | null = null;
    if (resendCountdown > 0) {
      countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [resendCountdown]);

  if (verifyIsLoading) console.log("Verifying...");
  if (verifyIsError) console.log("Error verifying" + verifyIsError);
  if (verifyIsSuccess) console.log("Verified successfully");

  if (resendIsLoading) console.log("Updating...");
  if (resendIsError) console.log("Error updating");
  if (resendIsSuccess) console.log("Updated successfully");

  return (
    <>
      <form>
        <div className="mt-6">
          <div className="text-gray-500  mb-10">
            Enter the 6-digit verification code we sent to {identifier}{" "}
          </div>
          <div className="flex flex-col items-center ">
            <Controller
              name="code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <VerificationInput
                    length={6}
                    passwordMode={false}
                    autoFocus={true}
                    placeholder=""
                    validChars="0-9"
                    onChange={(value) => field.onChange(value)}
                    classNames={{
                      container: "w-64 md:w-[21vw] ",
                      character:
                        "text-gray-500 bg-gray-200 border border-gray-300 p-1 rounded-md font-semibold flex items-center justify-center md:text-[20px]",
                      characterInactive: "",
                      characterSelected:
                        "text-indigo-600 outline-indigo-600 outline-2 ",
                    }}
                  />
                  {(errors.code || !serverRes?.success) && (
                    <span className="text-red-500 mt-2">
                      {errors.code ? "Code is required" : serverRes?.code}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="mt-10">
          <span className="mr-1">
            {resendCountdown > 0
              ? `Resend Code in ${resendCountdown} ${
                  resendCountdown === 1 ? "second" : "seconds"
                }`
              : "Didn't receive a code?"}
          </span>
          {resendCountdown === 0 && (
            <button
              type="button"
              className="underline"
              onClick={resendCode}
              disabled={resendCountdown > 0}
            >
              Resend Code
            </button>
          )}
        </div>
        <div className="w-full mt-5">
          <button
            className="w-full bg-indigo-500 text-white  px-5 py-1 my-2 rounded disabled:bg-indigo-300"
            onClick={handleSubmit(onSubmit)}
            disabled={verifyIsLoading}
          >
            {action != "forgot-password" ? "Continue" : "Next"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactVerification;
