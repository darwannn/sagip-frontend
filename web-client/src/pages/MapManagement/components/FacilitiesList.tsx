import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
};

const FacilitiesList = ({ facilities }: TProps) => {
  return (
    <div className="flex flex-col p-2 gap-2 max-h-[700px] overflow-y-auto">
      {facilities.length != 0 &&
        facilities.map((facility) => (
          <FacilityItem key={facility._id} facility={facility} />
        ))}
    </div>
  );
};

export default FacilitiesList;
