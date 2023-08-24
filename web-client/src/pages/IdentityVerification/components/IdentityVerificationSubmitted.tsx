import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import AuthForm from "../../../components/Form/AuthForm";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";

import request_submitted from "../../../assets/img/request_submitted.png";

const IdentityVerificationSubmitted = () => {
  const navigate = useNavigate();
  const registrationSuccessful = useAppSelector(
    (state) => state.auth.registrationSuccessful
  );
  return (
    <>
      <AuthForm
        component={
          <>
            {!registrationSuccessful && (
              <AuthFormHeader
                title="Verification Submitted!"
                buttonAction="navigate"
                action="/account-settings"
              />
            )}
            <div className="mb-10 flex-1 sm:flex-grow-0 text-center">
              <img src={request_submitted} className="w-80 mx-auto my-10" />
              <div className=" text-gray-500">
                Thank you for submitting your verification request. We will
                review your information and notify you once your request has
                been approved or if additional information is needed.
              </div>
              <br />
              <div className=" text-gray-500">
                Please allow several business days for processing.
                <span className="font-bold"> Thank you for your patience</span>
              </div>
            </div>
            {registrationSuccessful && (
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
                onClick={() => {
                  navigate("/register?success=success");
                }}
              >
                Finish
              </button>
            )}
          </>
        }
      />
    </>
  );
};

export default IdentityVerificationSubmitted;
