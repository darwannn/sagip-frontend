import AuthForm from "../../components/AuthForm/AuthForm";
import ContactVerification from "../../components/Verification/ContactVerification";

const LoginContactVerification = ({}) => {
  return (
    <AuthForm
      pageTitle="Verify Ownership"
      navigateTo="/login"
      component={<ContactVerification action="login" navigateTo="/login" />}
    />
  );
};

export default LoginContactVerification;
