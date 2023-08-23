import AuthForm from "../../../components/Form/AuthForm";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";

import request_submitted from "../../../assets/img/request_submitted.png";
const RegistrationSuccessful = () => {
  return (
    <>
      <AuthForm
        component={
          <>
            <AuthFormHeader
              title="Verification Request Submitted!"
              buttonAction="navigate"
              action="/account-settings"
            />
            <div className="mb-10 flex-1 sm:flex-grow-0">
              <img src={request_submitted} className="w-94 mx-auto my-10" />
              <div className=" text-gray-500">
                We are verifying your request.
              </div>
            </div>
            {/* <div className="flex gap-2">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
                onClick={() =>
                  dispatch(setDisplayedVerificationPage("requirements"))
                }
              >
                Proceed
              </button>
            </div> */}
          </>
        }
      />
    </>
  );
};

export default RegistrationSuccessful;
