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
import {
  setcontactVerificationRes,
  setRegistrationSuccessful,
  setVerifyOwnershipRes,
} from "../../store/slices/authSlice";

import {
  useContactVerificationMutation,
  useResendVerificationCodeMutation,
} from "../../services/authQuery";

import VerificationInput from "react-verification-input";
import { TUserResData } from "../../types/user";
import { isMobile } from "react-device-detect";

type TProps = {
  action: string;
  navigateTo: string;
  mobileVerify?: () => void;
};

const ContactVerification = ({ action, navigateTo, mobileVerify }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<Token>(token || "");

  const selectorIdentifier = useAppSelector((state) => state.auth.identifier);

  // Use the appropriate identifier based on the action
  const identifier =
    action !== "forgot-password" && action !== "register"
      ? selectorIdentifier
      : decodedToken.identifier;

  const [serverRes, setServerRes] = useState<TUserResData>();
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

    const res = await contactVerification({
      code: data.code,
      contactNumber: identifier ?? "",
      email: identifier ?? "",
      action,
    });

    if ("data" in res) {
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
        if (action === "register") {
          dispatch(setRegistrationSuccessful(true));
          window.AndroidInterface?.updateFcmToken(identifier);
        }
        if (action === "login") {
          dispatch(setVerifyOwnershipRes(res.data));
          navigate("/login");
          setAuthToken({ token: null });
        }

        // ! TEST THIS
        // - Close verify modal sheet for mobiles
        if (isMobile && mobileVerify) {
          mobileVerify();
        }
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitVerificationCode(data);
  };

  const resendCode = async () => {
    const res = await resendVerificationCode({
      identifier: identifier ?? "",
      action,
    });
    if ("data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        setResendCountdown(10);
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    }
  };

  useEffect(() => {
    let countdownInterval: ReturnType<typeof setInterval> | null = null;
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
          <div className="text-gray-500  mb-10 text-sm md:text-base">
            Enter the 6-digit verification code we sent to{" "}
            <span className="font-medium">{identifier}</span>{" "}
          </div>
          <div className="flex flex-col items-center">
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
                        "text-gray-500 bg-gray-200 border border-gray-300 p-1 rounded-md font-semibold flex items-center justify-center text-base md:text-[20px]",
                      characterInactive: "",
                      characterSelected:
                        "text-indigo-600 outline-indigo-600 outline-2 ",
                    }}
                  />
                  {(errors.verificationCode || !serverRes?.success) && (
                    <span className="text-red-500 mt-2 text-sm md:text-base">
                      {errors.verificationCode
                        ? "Code is required"
                        : serverRes?.verificationCode}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="mt-10 text-sm md:text-base">
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
            className="w-full btn-primary text-sm"
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
