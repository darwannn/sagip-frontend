import Sheet from "react-modal-sheet";
import AccountContactNumberForm from "../../../Admin/AccountSettings/components/AccountContactNumberForm";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ContactVerification from "../../../../components/Verification/ContactVerification";

const EditContactNumberSetting = () => {
  const [isVerify, setIsVerify] = useState<boolean>(false);

  return (
    <div className="p-5">
      <AccountContactNumberForm mobileVerify={() => setIsVerify(true)} />
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
                <p className="text-sm font-semibold">Verify Contact</p>
              </>
            </Sheet.Header>
            <Sheet.Content className="px-7">
              <ContactVerification
                action="contact"
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

export default EditContactNumberSetting;
