import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  setIdentifier,
  setcontactVerificationRes,
} from "../../../../store/slices/authSlice";
import { TUserResData } from "../../../../types/user";

import { useSendVerificationCodeMutation } from "../../../../services/authQuery";

import { MdClose } from "react-icons/md";

import Modal from "../../../../components/Modal/Modal";
import ContactVerification from "../../../../components/Verification/ContactVerification";
import { useGetUserByTokenQuery } from "../../../../services/accountQuery";

const AccountContactNumberForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserByTokenQuery();
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const contactVerificationRes = useAppSelector(
    (state) => state.auth.contactVerificationRes
  );
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [showModal, setShowModal] = useState<boolean>(false);

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
    }
  }, [contactVerificationRes]);

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
      contactNumber: userData?.contactNumber,
    },
  });

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
          setShowModal(true);
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitSendCode(data);
  };

  if (sendIsLoading) console.log("Updating...");
  if (sendIsError) console.log("Error updating");
  if (sendIsSuccess) console.log("Updated successfully");

  return (
    <div className="bg-white p-8 rounded-xl relative" ref={successMessageRef}>
      {
        <button
          className="absolute top-4 right-4 hover:bg-gray-300 rounded  text-gray-500 cursor-pointer"
          onClick={() => {
            navigate("/admin/account-settings");
          }}
        >
          <MdClose />
        </button>
      }
      <div className="text-3xl font-bold">Update Contact Number</div>
      {contactVerificationRes?.success && (
        <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {contactVerificationRes?.message}
        </div>
      )}
      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          id="contactNumber"
          className="border p-1 w-full"
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
          className="w-full lg:w-auto bg-indigo-500 text-white px-5 py-1 my-2 rounded disabled:bg-indigo-300"
          onClick={handleSubmit(onSubmit)}
          disabled={sendIsLoading}
        >
          Update
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
