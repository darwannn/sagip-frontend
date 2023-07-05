import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
  selectFacilityHandler: (facility: TFacility) => void;
  onDeleteFacilityHandler: (facilityId: string) => void;
};

const FacilitiesList = ({
  facilities,
  selectFacilityHandler,
  onDeleteFacilityHandler,
}: TProps) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      {facilities.length != 0 &&
        facilities.map((facility) => (
          <FacilityItem
            selectFacilityHandler={selectFacilityHandler}
            key={facility._id}
            facility={facility}
            onDeleteFacilityHandler={onDeleteFacilityHandler}
          />
        ))}
    </div>
  );
};

export default FacilitiesList;
