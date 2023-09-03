import { Link } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";

import emergency from "../../../../assets/img/emergency.jpg";

const EmergencyHotlines = () => {
  return (
    <>
      <Link to="/emergency-hotlines">
        <div
          className="flex items-center p-5 rounded-2xl my-2 cursor-pointer "
          style={{
            background: `linear-gradient(0deg, rgba(41, 59, 149, 0.82) 0%, rgba(41, 59, 149, 0.82) 100%), url(${emergency})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
          }}
        >
          <div className="flex-1 font-bold text-white text-xl">
            Malolos Emergency Hotlines
          </div>
          <IoMdInformationCircleOutline
            color="white"
            className="text-white text-3xl"
          />
        </div>
      </Link>
    </>
  );
};

export default EmergencyHotlines;
