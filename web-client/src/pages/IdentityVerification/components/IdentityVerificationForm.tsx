import { useAppSelector } from "../../../store/hooks";

import AuthForm from "../../../components/Form/AuthForm";
import IdentityVerificationNotice from "./IdentityVerificationNotice";

import IdentityVerificationRequirements from "./IdentityVerificationRequirements";

const RegisterForm = () => {
  const displayedVerificationPage = useAppSelector(
    (state) => state.auth.displayedVerificationPage
  );

  return (
    <>
      <AuthForm
        component={
          /*      <div className="min-h-screen flex">
        <div className="w-full flex flex-col p-8 bg-gray-50"> */
          <>
            {displayedVerificationPage === "notice" && (
              <IdentityVerificationNotice />
            )}

            {displayedVerificationPage === "requirements" && (
              <IdentityVerificationRequirements />
            )}
          </>
          /*  </div>
          </div> */
        }
      />
    </>
  );
};

export default RegisterForm;
