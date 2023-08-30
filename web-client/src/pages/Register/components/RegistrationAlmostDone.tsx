import { useNavigate } from "react-router-dom";
import AuthForm from "../../../components/Form/AuthForm";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";

import almost_done from "../../../assets/img/almost_done.png";
const RegistrationSuccessful = () => {
  const navigate = useNavigate();
  return (
    <>
      <AuthForm
        component={
          /*      <div className="min-h-screen flex">
        <div className="w-full flex flex-col p-8 bg-gray-50"> */
          <>
            <div className="relative">
              <AuthFormHeader
                title="Almost Done!"
                buttonAction="navigate"
                action="/login"
              />
              <button
                className="absolute top-0 right-0"
                onClick={() => navigate("/register?success=success")}
              >
                I'll do it later
              </button>
              <div className="mb-10 flex-1 sm:flex-grow-0">
                <img src={almost_done} className="w-94 mx-auto my-10" />
                <div className="text-center text-gray-500">
                  Verify your identity now to access all features of our app.{" "}
                  <br />
                  <br />
                  If you choose to skip this step, some features may be limited
                  until you complete the verification process later.
                </div>
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
                onClick={() => navigate("/identity-verification")}
              >
                Proceed to Verification
              </button>
            </div>
          </>
        }
        /* </div>
          </div> */
      />
    </>
  );
};

export default RegistrationSuccessful;
