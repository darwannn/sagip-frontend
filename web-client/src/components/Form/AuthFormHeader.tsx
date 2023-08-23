import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setDisplayedRegisterPage } from "../../store/slices/authSlice";
import { BsArrowLeft } from "react-icons/bs";

type TProp = {
  title: string;
  action: string;
  buttonAction: string;
};

const AuthFormHeader = ({ title, action, buttonAction }: TProp) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {buttonAction === "navigate" && (
        <div className="sm:mt-16 mb-10 ">
          {action !== "/" && (
            <Link to={action}>
              <BsArrowLeft className="text-2xl text-gray-500 mb-3" />
            </Link>
          )}
        </div>
      )}
      {buttonAction === "dispatch" && (
        <div className="sm:mt-16 mb-10 ">
          {action !== "/" && (
            <div onClick={() => dispatch(setDisplayedRegisterPage(action))}>
              <BsArrowLeft className="text-2xl text-gray-500 mb-3" />
            </div>
          )}
        </div>
      )}

      <h1 className="text-3xl font-bold text-indigo-600">{title}</h1>
    </>
  );
};

export default AuthFormHeader;
