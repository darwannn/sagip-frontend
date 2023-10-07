import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  setIdentifier,
  setcontactVerificationRes,
} from "../../../../store/slices/authSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TUserResData } from "../../../../types/user";

import { useSendVerificationCodeMutation } from "../../../../services/authQuery";
import { useGetUserByTokenQuery } from "../../../../services/accountQuery";

import Modal from "../../../../components/Modal/Modal";
import ContactVerification from "../../../../components/Verification/ContactVerification";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/Alert";

import { PiWarningCircleBold } from "react-icons/pi";
import { isMobile } from "react-device-detect";
import { LoaderSpin } from "../../../../components/Loader/Loader";

type TAccountEmailFormProps = {
  mobileVerify?: () => void;
};

const AccountEmailForm: React.FC<TAccountEmailFormProps> = ({
  mobileVerify,
}) => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserByTokenQuery();
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const contactVerificationRes = useAppSelector(
    (state) => state.auth.contactVerificationRes
  );
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { refetch: refetchUserData } = useGetUserByTokenQuery();

  useEffect(() => {
    /* removes the contactVerificationRes message */
    dispatch(setcontactVerificationRes(null));
  }, [dispatch]);

  useEffect(() => {
    if (contactVerificationRes) {
      setShowModal(false);
      successMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      refetchUserData();
    }
  }, [contactVerificationRes, refetchUserData]);

  const [
    sendVerificationCode,
    {
      isError: sendIsError,
      isLoading: sendIsLoading,
      isSuccess: sendIsSuccess,
    },
  ] = useSendVerificationCodeMutation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: userData?.email,
    },
  });

  const SubmitSendCode = async (data: FieldValues, action: string) => {
    if (action === "update") {
      if (!isDirty) {
        console.log("No changes made");
        return;
      }
    }
    const body = {
      email: action === "update" ? data.email : userData?.email,
    };

    if (userData) {
      const res = await sendVerificationCode({
        body,
        action: "verify-email",
      });

      if ("data" in res) {
        setServerRes(res.data);
        if (res.data.success) {
          if (isMobile && mobileVerify) {
            mobileVerify();
          } else {
            setShowModal(true);
          }
          dispatch(
            setIdentifier(action === "update" ? data.email : userData?.email)
          );
          /* setAuthToken({
            token: res.data.token || "",
          }); */
        }
      } else {
        if ("error" in res && "data" in res.error) {
          const errData = res.error.data as TUserResData;
          setServerRes(errData);
        }
      }
      console.log(res);
    }
  };

  /* sends verification code to new email address */
  const onUpdate: SubmitHandler<FieldValues> = async (data) => {
    SubmitSendCode(data, "update");
  };
  /* sends verification code to current email address */
  const onVerify: SubmitHandler<FieldValues> = async (data) => {
    SubmitSendCode(data, "verify");
  };

  if (sendIsLoading) console.log("Sending...");
  if (sendIsError) console.log("Error Sending");
  if (sendIsSuccess) console.log("Sent successfully");

  return (
    <div className="lg:p-0" ref={successMessageRef}>
      {contactVerificationRes?.success && (
        <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {contactVerificationRes?.message}
        </div>
      )}
      {
        /* !contactVerificationRes?.success && */
        userData?.emailStatus === "unverified" && (
          <Alert className="border-yellow-500  text-yellow-500 md:my-5 hidden md:block">
            <PiWarningCircleBold className="text-bas" />
            <AlertTitle className="text-sm md:text-base">
              Unverified Email Address
            </AlertTitle>
            <AlertDescription className="text-xs md:text-sm">
              To ensure the security of your account and receive important
              updates, please verify your email address.
            </AlertDescription>
            <button
              onClick={handleSubmit(onVerify)}
              className="font-medium  text-sm underline disabled:text-yellow-400"
              disabled={sendIsLoading}
            >
              {sendIsLoading ? "Sending..." : "Send Verification Code"}
            </button>
          </Alert>
        )
      }

      <div className="form-group text-xs md:text-sm w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-input w-full"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        {(errors.email || !serverRes?.success) && (
          <span className="text-red-500">
            {errors.email ? "Email is required" : serverRes?.email}
          </span>
        )}
      </div>

      <div className="w-full mt-5">
        <button
          className="btn-primary w-full lg:w-auto text-xs md:text-sm"
          onClick={handleSubmit(onUpdate)}
          disabled={sendIsLoading || !isDirty}
        >
          {sendIsLoading ? (
            <>
              <LoaderSpin /> Updating...
            </>
          ) : (
            "Update Email"
          )}
        </button>
      </div>

      <Modal
        modalTitle={"Email Address Verification"}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <div>
          <ContactVerification action="email" navigateTo="" />
        </div>
      </Modal>
    </div>
  );
};

export default AccountEmailForm;
