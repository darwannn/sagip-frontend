import AuthForm from "../../components/AuthForm/AuthForm";
import ContactVerification from "../../components/Verification/ContactVerification";

const ForgotPasswordContactVerification = () => {
  return (
    <AuthForm
      pageTitle="Reset your Password"
      navigateTo="/forgot-password"
      component={
        <ContactVerification
          action="forgot-password"
          navigateTo="/new-password"
        />
      }
    />
  );
};

export default ForgotPasswordContactVerification;
