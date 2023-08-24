import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setRegistrationSuccessful } from "../../../store/slices/authSlice";

import AuthForm from "../../../components/Form/AuthForm";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import registration_success from "../../../assets/img/registration_success.png";

const RegistrationSuccessful = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registrationSuccessful = useAppSelector(
    (state) => state.auth.registrationSuccessful
  );

  useEffect(() => {
    if (!registrationSuccessful) {
      navigate("/");
    }
  }, [registrationSuccessful, navigate]);

  return (
    <>
      <AuthForm
        component={
          <>
            <AuthFormHeader
              title="Account Creation Success!"
              buttonAction="navigate"
              action="/none"
            />
            <div className="mb-10 flex-1 sm:flex-grow-0">
              <img src={registration_success} className="w-94 mx-auto my-10" />
              <div className="text-center text-gray-500">
                Congratulations! Your account has been created successfully
              </div>
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
              onClick={() => {
                dispatch(setRegistrationSuccessful(false));
                navigate("/home");
              }}
            >
              Finish
            </button>
          </>
        }
      />
    </>
  );
};

export default RegistrationSuccessful;
