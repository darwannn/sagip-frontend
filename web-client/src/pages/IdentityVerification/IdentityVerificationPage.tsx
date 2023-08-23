import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useGetIdVerificationRequestQuery } from "../../services/authQuery";
import { setDisplayedVerificationPage } from "../../store/slices/authSlice";
import IdentityVerificationForm from "./components/IdentityVerificationForm";
import IdentityVerifying from "./components/IdentityVerifying";

const IdentityVerificationPage = () => {
  const dispatch = useAppDispatch();

  const [alreadyRequested, setAlreadyRequested] = useState<boolean>(false);
  /* show email page by default */
  useEffect(() => {
    dispatch(setDisplayedVerificationPage("notice"));
  }, [dispatch]);
  const {
    data: requestData,
    isLoading,
    error,
  } = useGetIdVerificationRequestQuery();
  useEffect(() => {
    /* indicates that the user is already verified */
    if (!requestData?.success) {
      /*  if (requestData?.message.includes("not found")) {
      } */
      if (requestData?.message.includes("pending")) {
        setAlreadyRequested(true);
      }
    }
  }, [requestData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  return (
    <>
      {
        /* requestData?.message.includes("pending") */ alreadyRequested ? (
          <IdentityVerifying />
        ) : (
          <IdentityVerificationForm />
        )
      }
    </>
  );
};

export default IdentityVerificationPage;
