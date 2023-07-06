import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
  onDeleteFacilityHandler: (facilityId: string) => void;
};

const FacilitiesList = ({ facilities, onDeleteFacilityHandler }: TProps) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      {facilities.length != 0 &&
        facilities.map((facility) => (
          <FacilityItem
            key={facility._id}
            facility={facility}
            onDeleteFacilityHandler={onDeleteFacilityHandler}
          />
        ))}
    </div>
  );
};

export default FacilitiesList;
