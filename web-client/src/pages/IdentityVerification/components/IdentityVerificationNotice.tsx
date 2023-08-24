import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setDisplayedVerificationPage } from "../../../store/slices/authSlice";

import AuthFormHeader from "../../../components/Form/AuthFormHeader";

import account_verification from "../../../assets/img/account_verification.png";

const IdentityVerificationNotice = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <AuthFormHeader
        title="Account Verification"
        buttonAction="navigate"
        action="/none"
      />
      <div className="mb-10 flex-1 sm:flex-grow-0">
        <img src={account_verification} className="w-80 mx-auto my-10" />
        <div className=" text-gray-500">
          We are required to verify our users identity for{" "}
          <span className="font-semibold">security purposes</span>.
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="border border-gray-500 text-gray-500 hover:bg-gray-200 px-5 py-1 rounded w-full"
          onClick={() => navigate("/register?success=success")}
        >
          Cancel
        </button>

        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
          onClick={() => dispatch(setDisplayedVerificationPage("requirements"))}
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default IdentityVerificationNotice;
