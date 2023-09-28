import AuthForm from "../../components/Form/AuthForm";
import AuthFormHeader from "../../components/Form/AuthFormHeader";
import ContactVerification from "../../components/Verification/ContactVerification";

const LoginContactVerification = () => {
  return (
    <AuthForm
      component={
        <>
          <AuthFormHeader
            title="Verify Ownership"
            buttonAction="navigate"
            action="/login"
          />
          <ContactVerification action="login" navigateTo="" />
        </>
      }
    />
  );
};

export default LoginContactVerification;
