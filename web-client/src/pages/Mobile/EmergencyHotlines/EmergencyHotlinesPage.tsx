import { Link } from "react-router-dom";
import EmergencyHotlineList from "./EmergencyHotlineList";
/* import AuthFormHeader from "../../../components/Form/AuthFormHeader"; */

import Malolos_CDRRMO_Logo from "../../../assets/img/Malolos_CDRRMO_Logo.png";
import fire_truck from "../../../assets/img/fire_truck.png";
import police_car from "../../../assets/img/police_car.png";
import Red_Cross_Logo from "../../../assets/img/Red_Cross_Logo.png";

import { BsArrowLeft } from "react-icons/bs";

const EmergencyHotline = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-2 mx-5">
        {/* <AuthFormHeader
          title="Emergency Hotlines"
          buttonAction="navigate"
          action="/home"
        /> */}
        <div className="">
          <div className="my-10">
            <Link to="/home">
              <BsArrowLeft className="text-2xl text-gray-500 mb-3 cursor-pointer" />
            </Link>
            <h1 className="text-3xl font-bold text-primary-600">
              Emergency Hotlines
            </h1>
          </div>
        </div>
        <EmergencyHotlineList
          logo={Malolos_CDRRMO_Logo}
          title="Malolos Rescue"
          contactNumber="09282269801"
          isPrimary={true}
        />
        <EmergencyHotlineList
          logo={fire_truck}
          title="City Fire Station"
          contactNumber="09951860370"
          isPrimary={false}
        />
        <EmergencyHotlineList
          logo={police_car}
          title="City Police Station"
          contactNumber="09985985383"
          isPrimary={false}
        />
        <EmergencyHotlineList
          logo={Red_Cross_Logo}
          title="Philippine Red Cross"
          contactNumber="287902300"
          isPrimary={false}
        />
      </div>
    </>
  );
};

export default EmergencyHotline;
