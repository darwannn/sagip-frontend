import { useNavigate } from "react-router-dom";
import SAGIP_Logo from "../../assets/img/SAGIP_Logo.png";
import Malolos_City_Hall from "../../assets/img/Malolos_City_Hall.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobileDevice = /Mobi|iPhone|Android/i.test(navigator.userAgent);

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center text-white text-xl p-5"
      style={{
        background: `linear-gradient(0deg, rgba(151, 32, 32, 0.90) 0%, rgba(41, 59, 149, 0.90) 100%), url(${Malolos_City_Hall})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
      }}
    >
      <img src={SAGIP_Logo} className="w-40 mx-auto" alt="Logo" />

      <div className="text-5xl font-bold mt-4 text-center">SAGIP</div>
      <div className="mt-4 text-center px-0 ">
        Safety Assistance with Geo-tracking
        <br />
        Integration Program
      </div>
      <div className="mt-4 text-center px-0 sm:w-96 w-full">
        {isMobileDevice && (
          <button
            className="visisble md:hidden bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 my-2 rounded-lg w-full"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        )}

        <button
          className={`${
            isMobileDevice
              ? "bg-white hover:bg-gray-300 text-black"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          } backdrop:px-5 py-2 my-2 rounded-lg w-full`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        {isMobileDevice && (
          <button
            className="visisble md:hidden underline mt-10"
            onClick={() => navigate("/home")}
          >
            Continue as guest
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
