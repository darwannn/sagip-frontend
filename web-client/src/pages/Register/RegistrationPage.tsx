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

  useEffect(() => {
    dispatch(setDisplayedRegisterPage("email"));
  }, [dispatch]);

  return (
    <>
      {isSuccess === "success" ? (
        /* will display this component if the url has a query param of ?success=success */
        <RegistrationSuccessful />
      ) : (
        <RegistrationForm />
      )}
    </>
  );
};

export default RegisterPage;
