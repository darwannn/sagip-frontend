import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setDisplayedRegisterPage } from "../../store/slices/authSlice";

import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccessful from "./components/RegistrationSuccessful";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSuccess = queryParams.get("success");

  // If the 'success' query parameter is present and has a truthy value
  if (isSuccess) {
    // Redirect to the RegistrationSuccessful component
  }
  /* show email page by default */
  useEffect(() => {
    dispatch(setDisplayedRegisterPage("email"));
  }, [dispatch]);

  return (
    <>
      {isSuccess === "success" ? (
        <RegistrationSuccessful />
      ) : (
        <RegistrationForm />
      )}
    </>
  );
};

export default RegisterPage;
