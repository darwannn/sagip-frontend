import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "../../../types/user";

import { useSendVerificationCodeMutation } from "../../../services/authQuery";
import { setIdentifier } from "../../../store/slices/authSlice";

import { MdClose } from "react-icons/md";

import Modal from "../../../components/Modal/Modal";
import ContactVerification from "../../../components/Verification/ContactVerification";
type TProps = {
  userData?: User;
};

const AccountEmailForm = ({ userData }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contactVerificationRes = useAppSelector(
    (state) => state.auth.contactVerificationRes
  );
  const [serverResponse, setServerResponse] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (contactVerificationRes) {
      setShowModal(false);
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

      if (res && "data" in res) {
        setServerResponse(res);
        if (res.data.success) {
          setShowModal(true);
          dispatch(setIdentifier(data.email));
        }
      } else {
        setServerResponse(res.error);
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
    <div className="bg-white p-8 rounded-xl relative">
      <button
        className="absolute top-4 right-4 hover:bg-gray-300 rounded  text-gray-500 cursor-pointer"
        onClick={() => {
          navigate("/account-settings");
        }}
      >
        <MdClose />
      </button>
      <div className="text-3xl font-bold">Update Email</div>
      {contactVerificationRes?.success && (
        <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
          {contactVerificationRes?.message}
        </div>
      )}
      {!contactVerificationRes?.success &&
        userData?.emailStatus === "unverified" && (
          <div className="bg-red-400 text-white px-5 py-3 my-5  text-center rounded">
            <span className="mr-2">
              Youe Email Address is still unverified.
            </span>
            <button onClick={handleSubmit(onVerify)} className="underline">
              Verify Now
            </button>
          </div>
        )}

      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border p-1 w-full"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        {(errors.email || !serverResponse?.success) && (
          <span className="text-red-500">
            {errors.email ? "Email is required" : serverResponse?.data.email}
          </span>
        )}
      </div>

      <div className="w-full mt-5">
        <button
          className="w-full lg:w-auto bg-indigo-500 text-white px-5 py-1 my-2 rounded disabled:bg-indigo-300"
          onClick={handleSubmit(onUpdate)}
          disabled={sendIsLoading}
        >
          Update
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
