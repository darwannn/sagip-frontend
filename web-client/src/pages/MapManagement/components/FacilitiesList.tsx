import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
  panMapHandler: (lat: number, lng: number) => void;
};

const FacilitiesList = ({ facilities, panMapHandler }: TProps) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      {facilities.length != 0 &&
        facilities.map((facility) => (
          <FacilityItem
            key={facility._id}
            facility={facility}
            panMapHandler={panMapHandler}
          />
        ))}
    </div>
  );
};

export default FacilitiesList;
