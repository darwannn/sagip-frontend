import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

import { setAuthToken } from "../../util/auth";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { setcontactVerificationRes } from "../../store/slices/authSlice";
import { useAppSelector } from "../../store/hooks";
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

  const user = localStorage.getItem("user");
  const identifier =
    action != "forgot-password"
      ? useAppSelector((state) => state.auth.identifier)
      : user
      ? JSON.parse(user).identifier
      : "";

  const [serverResponse, setServerResponse] = useState<any>();
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

  /*   useEffect(() => {
    if (identifier && identifier.includes("@")) {
      setAction("email");
    // } else if (/^09\d{9}$/.test(identifier)) {
    //     setAction("contactNumber");
    //   } else {
      setAction("contactNumber");
    }
  }, []); */

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
      setServerResponse(res);
      if (res.data.success) {
        if (navigateTo !== "") {
          setAuthToken({
            token: res.data.token || "",
            user: res.data.user || {
              for: "",
              id: "",
              status: "",
              userType: "",
              identifier: "",
            },
          });
          navigate(navigateTo);
        } else {
          dispatch(setcontactVerificationRes(res.data));
        }
      }
    } else {
      setServerResponse(res.error);
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
      setServerResponse(res);
      if (res.data.success) {
        setResendCountdown(10);
      }
    } else {
      setServerResponse(res.error);
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
                      container: "w-64 md:w-[21vw]",
                      character:
                        "text-gray-500 bg-gray-200 border border-gray-300 p-1 rounded-md font-semibold flex items-center justify-center",
                      characterInactive: "",
                      characterSelected:
                        "text-indigo-600 outline-indigo-600 outline-2 ",
                    }}
                  />
                  {(errors.code || !serverResponse?.success) && (
                    <span className="text-red-500 mt-2">
                      {errors.code
                        ? "Code is required"
                        : serverResponse?.data.code}
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
