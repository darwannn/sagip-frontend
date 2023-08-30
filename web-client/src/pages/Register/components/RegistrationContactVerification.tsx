import AuthForm from "../../../components/Form/AuthForm";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import ContactVerification from "../../../components/Verification/ContactVerification";

const RegistrationContactVerification = () => {
  return (
    <AuthForm
      component={
        /*      <div className="min-h-screen flex">
        <div className="w-full flex flex-col p-8 bg-gray-50"> */
        <>
          <AuthFormHeader
            title="We just sent you an SMS"
            buttonAction="navigate"
            action="/login"
          />

          <ContactVerification
            action="register"
            navigateTo="/register/identity-verification"
          />
        </>
        /*  </div>
          </div> */
      }
    />
  );
};

export default RegistrationContactVerification;
