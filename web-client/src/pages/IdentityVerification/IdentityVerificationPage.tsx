import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useGetIdVerificationRequestQuery } from "../../services/authQuery";
import { setDisplayedVerificationPage } from "../../store/slices/authSlice";

import IdentityVerificationSubmitted from "./components/IdentityVerificationSubmitted";
import IdentityVerificationForm from "./components/IdentityVerificationForm";

const IdentityVerificationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [alreadyRequested, setAlreadyRequested] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setDisplayedVerificationPage("notice"));
  }, [dispatch]);

  const { data: requestData, error } = useGetIdVerificationRequestQuery();
  useEffect(() => {
    /* indicates that the user is already verified */
    if (!requestData?.success) {
      if (requestData?.message.includes("not found")) {
        navigate("/home");
      }
      if (requestData?.message.includes("pending")) {
        setAlreadyRequested(true);
      }
    }
  }, [requestData, navigate]);

  if (error) {
    return <p>Something went wrong</p>;
  }
  return (
    <>
      {alreadyRequested ? (
        <IdentityVerificationSubmitted />
      ) : (
        <IdentityVerificationForm />
      )}
    </>
  );
};

export default IdentityVerificationPage;
