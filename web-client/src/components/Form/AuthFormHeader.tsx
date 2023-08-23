import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  setDisplayedVerificationPage,
  setDisplayedRegisterPage,
} from "../../store/slices/authSlice";
import { BsArrowLeft } from "react-icons/bs";

type TProp = {
  title: string;
  action: string;
  buttonAction: string;
  target?: string;
};

const AuthFormHeader = ({ title, action, buttonAction, target }: TProp) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {buttonAction === "navigate" && (
        <div className="sm:mt-16 mb-10 ">
          {action !== "/" && (
            <Link to={action}>
              <BsArrowLeft className="text-2xl text-gray-500 mb-3 cursor-pointer" />
            </Link>
          )}
        </div>
      )}
      {buttonAction === "dispatch" && (
        <div className="sm:mt-16 mb-10">
          {action !== "/" && (
            <div
              onClick={() => {
                if (target === "register") {
                  dispatch(setDisplayedRegisterPage(action));
                }
                if (target === "identity-verification") {
                  dispatch(setDisplayedVerificationPage(action));
                }
              }}
            >
              <BsArrowLeft className="text-2xl text-gray-500 mb-3 cursor-pointer" />
            </div>
          )}
        </div>
      )}

      <h1 className="text-3xl font-bold text-indigo-600">{title}</h1>
    </>
  );
};

export default AuthFormHeader;
