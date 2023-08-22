import { memo } from "react";
// Functional Components
import FacilityItem from "./FacilityItem";
// Types
import { TFacility } from "../types/emergencyFacility";

type TProps = {
  facilities: TFacility[];
};

const FacilitiesList = memo(({ facilities }: TProps) => {
  return (
    <div className="flex flex-col gap-3 max-h-[70vh] w-[350px] overflow-y-auto">
      {facilities.length != 0 ? (
        facilities.map((facility) => (
          <FacilityItem key={facility._id} facility={facility} />
        ))
      ) : (
        <p className="text-center">No Results</p>
      )}
    </div>
  );
});

export default FacilitiesList;
