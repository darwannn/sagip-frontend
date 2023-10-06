/**
 * - MOBILE COMPONENT
 * TODO: Add warning for unverified email
 */
import Sheet from "react-modal-sheet";
import AccountEmailForm from "../../../Admin/AccountSettings/components/AccountEmailForm";
import ContactVerification from "../../../../components/Verification/ContactVerification";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const EditEmailSetting = () => {
  const [isVerify, setIsVerify] = useState<boolean>(false);

  return (
    <div className="p-5">
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
