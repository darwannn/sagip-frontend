import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setDeleteAccountRes } from "../../../store/slices/accountSlice";

import moment from "moment";

import Modal from "../../../components/Modal/Modal";
import Password from "../../../components/Verification/Password";

const AccountDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordVerificationRes = useAppSelector(
    (state) => state.auth.passwordVerificationRes
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (passwordVerificationRes) {
      /* setShowModal(false); */
      console.log("424");
      dispatch(setDeleteAccountRes(passwordVerificationRes));
      navigate("/login");
      /* TODO: remove token and user data from local storage */
    }
  }, [passwordVerificationRes, dispatch, navigate]);

  return (
    <>
      <button
        className=" w-full bg-red-500 text-white  px-5 py-1 my-2 rounded "
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>

      <Modal
        modalTitle={"Delete Account?"}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <>
          <div>
            <div>
              Your account will be permanently deleted after 30 days,
              {` on ${moment().add(30, "days").format("MMMM DD, YYYY")}.`}
            </div>

            <div className="mt-6 mb-2">
              Please type your password to continue.
            </div>
            <Password action="archive" />
          </div>
        </>
      </Modal>
    </>
  );
};

export default AccountDelete;
