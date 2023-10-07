/**
 * - MOBILE COMPONENT
 * TODO: Add warning for unverified email
 */
import Sheet from "react-modal-sheet";
import AccountEmailForm from "../../../Admin/AccountSettings/components/AccountEmailForm";
import ContactVerification from "../../../../components/Verification/ContactVerification";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useGetUserByTokenQuery } from "../../../../services/accountQuery";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/Alert";
import { useSendVerificationCodeMutation } from "../../../../services/authQuery";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../store/hooks";
import { setIdentifier } from "../../../../store/slices/authSlice";
import { LuMailWarning } from "react-icons/lu";

const EditEmailSetting = () => {
  const { data: userData, isLoading } = useGetUserByTokenQuery();
  const [sendVerificationCode, sendCodeState] =
    useSendVerificationCodeMutation();
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onVerifyEmailHandler = async () => {
    if (!userData) return;
    const body = {
      email: userData.email,
    };
    const res = await toast.promise(
      sendVerificationCode({ body, action: "verify-email" }).unwrap,
      {
        pending: "Sending verification code...",
        success: "Verification code sent",
        error: "Error sending verification code",
      },
      {
        position: "top-center",
      }
    );
    if (res.success) {
      setIsVerify(true);
      dispatch(setIdentifier(userData.email));
    }
  };

  if (isLoading) return <div>Loading User Data ....</div>;

  return (
    <div className="p-5">
      {userData?.emailStatus === "unverified" && (
        <Alert className="bg-yellow-200 border-none mb-5">
          <AlertTitle className="text-sm flex items-center gap-2">
            <LuMailWarning /> Email is not verified
          </AlertTitle>
          <AlertDescription className="text-xs">
            To ensure the security of your account and receive important
            updates, please verify your email address.
          </AlertDescription>
          <button
            onClick={onVerifyEmailHandler}
            className="underline text-sm font-medium disabled:text-yellow-400"
            disabled={sendCodeState.isLoading}
          >
            Verify now
          </button>
        </Alert>
      )}
      <AccountEmailForm mobileVerify={() => setIsVerify(true)} />
      <Sheet
        isOpen={isVerify}
        onClose={() => setIsVerify(false)}
        snapPoints={[400]}
        disableDrag
      >
        <Sheet.Backdrop
          onTap={(e) => {
            e.stopPropagation();
          }}
        >
          <Sheet.Container>
            <Sheet.Header className="py-2 relative border-b">
              <>
                <button
                  onClick={() => setIsVerify(false)}
                  className="absolute left-2 top-[50%] -translate-y-[50%]"
                >
                  <MdOutlineClose />
                </button>
                <p className="text-sm font-semibold">Verify Email</p>
              </>
            </Sheet.Header>
            <Sheet.Content className="px-7">
              <ContactVerification
                action="email"
                navigateTo=""
                mobileVerify={() => setIsVerify(false)}
              />
            </Sheet.Content>
          </Sheet.Container>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
};

export default EditEmailSetting;
