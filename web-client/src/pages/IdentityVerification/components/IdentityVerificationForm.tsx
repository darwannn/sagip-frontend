import { useAppSelector } from "../../../store/hooks";

import AuthForm from "../../../components/Form/AuthForm";
import VerificationNotice from "./VerificationNotice";

import VerificationRequirements from "./VerificationRequirements";

const RegisterForm = () => {
  const displayedVerificationPage = useAppSelector(
    (state) => state.auth.displayedVerificationPage
  );

  return (
    <>
      <AuthForm
        component={
          <>
            {displayedVerificationPage === "notice" && <VerificationNotice />}

            {displayedVerificationPage === "requirements" && (
              <VerificationRequirements />
            )}
          </>
        }
      />
    </>
  );
};

export default RegisterForm;
