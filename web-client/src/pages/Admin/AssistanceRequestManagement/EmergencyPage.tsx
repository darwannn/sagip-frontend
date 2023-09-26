// TODO: fetch emergency / assistance data
//       display user information
//       display emergency information
//       display emergency map
//       assign responder to emergency
//       mark emergency as resolved?
import { useNavigate } from "react-router";
import { MdArrowBack } from "react-icons/md";

const EmergencyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col bg-gray-100 min-h-screen">
      {/* header */}
      <div className="px-10 pt-10 pb-5 bg-white shadow z-10">
        {/* TODO: ASSISTANCE ID HERE */}
        <div className="text-sm">
          <button
            onClick={() => navigate("/admin/assistance-requests")}
            className="flex flex-row items-center gap-2 text-gray-500 font-semibold hover:bg-gray-200 p-2 rounded transition-all duration-100"
          >
            <MdArrowBack />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-red-500">
            65082951d2c94183011a5403
          </h1>
        </div>
      </div>
      {/* body */}
      <div className="flex-1 grid grid-cols-3 bg-white">
        <div className="p-5">
          <h2>Emergency Information</h2>
        </div>
        <div className="p-5 border-x">
          <h2>User Information</h2>
        </div>
        <div className="p-5">
          <h2>Respond</h2>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
