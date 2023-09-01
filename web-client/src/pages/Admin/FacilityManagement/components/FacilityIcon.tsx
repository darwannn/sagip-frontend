import {
  MdLocalHospital,
  MdLocalPolice,
  MdFireTruck,
  MdNightShelter,
} from "react-icons/md";

type TProps = {
  facilityType: string;
};
const FacilityIcon = ({ facilityType }: TProps) => {
  if (facilityType.toLowerCase() === "hospital") {
    return <MdLocalHospital />;
  }

  if (facilityType.toLowerCase() === "police station") {
    return <MdLocalPolice />;
  }

  if (facilityType.toLowerCase() === "fire station") {
    return <MdFireTruck />;
  }

  if (facilityType.toLowerCase() === "evacuation center") {
    return <MdNightShelter />;
  }

  return <div>INVALID</div>;
};

export default FacilityIcon;
