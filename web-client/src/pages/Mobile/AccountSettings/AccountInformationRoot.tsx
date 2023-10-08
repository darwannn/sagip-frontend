import { Outlet, useNavigate } from "react-router-dom";
import MobileHeder from "../../../components/MobileHeader/MobileHeader";
import { LuArrowLeft } from "react-icons/lu";

const AccountInformationRoot = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full pb-28">
      <MobileHeder>
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 bg-white text-gray-500 rounded-md"
            onClick={() => navigate(-1)}
          >
            <LuArrowLeft />
          </button>
          <h1 className="font-semibold">Account Information</h1>
        </div>
      </MobileHeder>
      <Outlet />
    </div>
  );
};

export default AccountInformationRoot;
