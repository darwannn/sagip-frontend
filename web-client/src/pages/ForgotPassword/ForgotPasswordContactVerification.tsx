import AuthForm from "../../components/Form/AuthForm";
import AuthFormHeader from "../../components/Form/AuthFormHeader";
import ContactVerification from "../../components/Verification/ContactVerification";

const ForgotPasswordContactVerification = () => {
  return (
    <AuthForm
      component={
        <>
          <AuthFormHeader
            title="Reset your Password"
            buttonAction="navigate"
            action="/forgot-password"
          />
          <ContactVerification
            action="forgot-password"
            navigateTo="/new-password"
          />
        </>
      }
    />
  );
};

export default ForgotPasswordContactVerification;
