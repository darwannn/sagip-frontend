import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  setIdentifier,
  setcontactVerificationRes,
} from "../../../../store/slices/authSlice";
import { TUserResData } from "../../../../types/user";

import { useSendVerificationCodeMutation } from "../../../../services/authQuery";

import Modal from "../../../../components/Modal/Modal";
import ContactVerification from "../../../../components/Verification/ContactVerification";
import { useGetUserByTokenQuery } from "../../../../services/accountQuery";
import { isMobile } from "react-device-detect";
import { LoaderSpin } from "../../../../components/Loader/Loader";

type AccountContactNumberFormProps = {
  mobileVerify?: () => void;
};

const AccountContactNumberForm: React.FC<AccountContactNumberFormProps> = ({
  mobileVerify,
}) => {
  const dispatch = useAppDispatch();
  const { data: userData, isLoading, isSuccess } = useGetUserByTokenQuery();
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const contactVerificationRes = useAppSelector(
    (state) => state.auth.contactVerificationRes
  );
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [showModal, setShowModal] = useState<boolean>(false);

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
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      contactNumber: userData?.contactNumber,
    },
  });

  useEffect(() => {
    /* removes the contactVerificationRes message */
    dispatch(setcontactVerificationRes(null));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setValue("contactNumber", userData?.contactNumber);
    }
  }, [isSuccess, setValue, userData]);

  useEffect(() => {
    if (contactVerificationRes) {
      setShowModal(false);
      successMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [contactVerificationRes]);

  const SubmitSendCode = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body = {
      contactNumber: data.contactNumber,
    };

    if (userData) {
      const res = await sendVerificationCode({
        body,
        action: "contact-number",
      });

      if (res && "data" in res) {
        setServerRes(res.data);
        if (res.data.success) {
          // Check if using a mobile device
          if (isMobile && mobileVerify) {
            mobileVerify();
          } else {
            setShowModal(true);
          }

          dispatch(setIdentifier(data.contactNumber));
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
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <LoaderSpin className="text-xl" />
        <p>Fetching Contact Information....</p>
      </div>
    );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitSendCode(data);
  };

  if (sendIsLoading) console.log("Updating...");
  if (sendIsError) console.log("Error updating");
  if (sendIsSuccess) console.log("Updated successfully");

  return (
    <div className="" ref={successMessageRef}>
      {contactVerificationRes?.success && (
        <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {contactVerificationRes?.message}
        </div>
      )}
      <div className="form-group text-xs md:text-sm w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="contactNumber" className="form-label">
          Contact Number
        </label>
        <input
          type="text"
          id="contactNumber"
          className="form-input w-full"
          placeholder="Contact Number"
          maxLength={11}
          {...register("contactNumber", { required: true })}
        />
        {(errors.contactNumber || !serverRes?.success) && (
          <span className="text-red-500">
            {errors.contactNumber
              ? "Contact Number is required"
              : serverRes?.contactNumber}
          </span>
        )}
      </div>

      <div className="w-full mt-5 ">
        <button
          className="btn-primary text-xs md:text-sm w-full lg:w-auto"
          onClick={handleSubmit(onSubmit)}
          disabled={sendIsLoading || !isDirty}
        >
          {sendIsLoading ? (
            <>
              <LoaderSpin /> Updating...
            </>
          ) : (
            "Update Contact"
          )}
        </button>
      </div>

      <Modal
        modalTitle={"Contact Number Verification"}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <>
          <div>
            <ContactVerification action="contact" navigateTo="" />
          </div>
        </>
      </Modal>
    </div>
  );
};

export default AccountContactNumberForm;
