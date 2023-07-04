import type { TFacility } from "../types/emergencyFacility";

type TProps = {
  facility: TFacility;
  panMapHandler: (lat: number, lng: number) => void;
};

const FacilityItem = ({ facility, panMapHandler }: TProps) => {
  return (
    <div
      className="border p-1 hover:bg-gray-200 cursor-pointer"
      onClick={() => {
        panMapHandler(facility.latitude, facility.longitude);
      }}
    >
      <p>{facility.name}</p>
      <p>{facility.contactNumber}</p>
      <p>{facility.latitude}</p>
      <p>{facility.longitude}</p>
    </div>
  );
};

export default FacilityItem;
