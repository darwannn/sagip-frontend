import AuthForm from "../../../components/Form/AuthForm";
import AuthFormHeader from "../../../components/Form/AuthFormHeader";
import ContactVerification from "../../../components/Verification/ContactVerification";

const RegisterContactVerification = () => {
  return (
    <AuthForm
      component={
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
      }
    />
  );
};

export default RegisterContactVerification;
