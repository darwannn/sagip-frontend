// Images
import SAGIP_Logo from "../../assets/img/SAGIP_Logo.png";
import Malolos_City_Hall from "../../assets/img/Malolos_City_Hall.jpg";

type TProp = {
  component: JSX.Element;
};

const AuthForm = ({ component }: TProp) => {
  return (
    <div className="min-h-screen flex">
      {/* left side */}
      <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-8 bg-gray-50">
        {/* component */}
        {component}
      </div>
      {/* right side */}
      <div
        className="hidden w-full  sm:flex sm:flex-col sm:justify-center text-white text-xl p-5"
        style={{
          background: `linear-gradient(90deg, rgba(151, 32, 32, 0.90) 0%, rgba(41, 59, 149, 0.90) 100%), url(${Malolos_City_Hall})`,
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
      </div>
    </div>
  );
};

export default AuthForm;
