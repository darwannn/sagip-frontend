import Malolos_City_Hall from "../../assets/img/Malolos_City_Hall.jpg";

type TProp = {
  children: JSX.Element;
};

const MobileHeder = ({ children }: TProp) => {
  return (
    <div
      className="flex items-center px-5 pb-5 pt-10 rounded-b-2xl  bg-gray-100 text-white"
      style={{
        background: `linear-gradient(90deg, rgba(151, 32, 32, 0.90) 0%, rgba(41, 59, 149, 0.90) 100%), url(${Malolos_City_Hall})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
      }}
    >
      {children}
    </div>
  );
};

export default MobileHeder;
