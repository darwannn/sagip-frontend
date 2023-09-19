import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useSendIdVerificationRequestMutation } from "../../../services/authQuery";
import { setDisplayedVerificationPage } from "../../../store/slices/authSlice";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import Modal from "../../../components/Modal/Modal";

import sample_id from "../../../assets/img/sample_id.png";

const RegistrationSuccessful = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registrationSuccessful = useAppSelector(
    (state) => state.auth.registrationSuccessful
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setUploadedImage(selectedFile);
      setShowModal(true);
    }
  };
  const [
    verificationRequest,
    {
      isError: sendIsError,
      isLoading: sendIsLoading,
      isSuccess: sendIsSuccess,
    },
  ] = useSendIdVerificationRequestMutation();

  const SubmitSendCode = async () => {
    const body = new FormData();

    if (uploadedImage) {
      body.append("selfieImage", uploadedImage, "selfie.png");
    }

    const res = await verificationRequest({
      body,
    });

    console.log(res);

    if (res && "data" in res) {
      if (res.data.success) {
        if (registrationSuccessful) {
          navigate("/register?success=success");
        } else {
          navigate(0);
        }
      }
    }
  };

  if (sendIsLoading) console.log("Updating...");
  if (sendIsError) console.log("Error updating");
  if (sendIsSuccess) console.log("Updated successfully");
  return (
    <>
      <AuthFormHeader
        title="Submit your ID"
        buttonAction="dispatch"
        action="notice"
        target="identity-verification"
      />
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <div className="text-gray-500 mt-5">
          We will only use your ID for verification purposes and it will be kept
          confidential.
        </div>
        <img src={sample_id} alt="Sample ID" className="w-80 mx-auto my-10" />
        <div className="text-gray-500">
          Here’s our list of valid ID:
          <ul className="list-disc ml-10">
            <li>National ID</li>
            <li>Passport</li>
            <li>Postal ID</li>
            <li>UMID (Unified Multi-Purpose ID)</li>
            <li>Driver’s License</li>
            <li>Employee ID</li>
            <li>Student ID</li>
          </ul>
        </div>
      </div>

      {uploadedImage && (
        <Modal
          modalTitle=""
          modalShow={showModal}
          modalClose={() => setShowModal(false)}
        >
          <>
            <div className="uploaded-image">
              <div className="text-center text-gray-500 mx-5">
                Make sure everything is readable and there is no glare in the id{" "}
              </div>
              <img
                src={URL.createObjectURL(uploadedImage)}
                className="w-94 mx-auto my-5 rounded"
              />
            </div>

            <div className="flex gap-2">
              <button
                className="border border-gray-500 text-gray-500 hover:bg-gray-200 px-5 py-1 rounded w-full"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                Re-take
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
                onClick={SubmitSendCode}
              >
                Proceed
              </button>{" "}
            </div>
          </>
        </Modal>
      )}

      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={() => {
          dispatch(setDisplayedVerificationPage("requirements"));
          fileInputRef.current?.click();
          /* const androidInterface = (window as any).AndroidInterface;
          androidInterface?.setMediaChooser("camera"); */
        }}
      >
        Proceed
      </button>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*;capture=camera"
        onChange={handleFileChange}
      />
    </>
  );
};

export default RegistrationSuccessful;
