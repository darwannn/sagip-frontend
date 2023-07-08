import { memo } from "react";
import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
};

const FacilitiesList = memo(({ facilities }: TProps) => {
  return (
    <div className="flex flex-col p-3 gap-3 max-h-[700px] w-[350px] overflow-y-auto bg-gray-50 shadow-md rounded-md">
      {facilities.length != 0 &&
        facilities.map((facility) => (
          <FacilityItem key={facility._id} facility={facility} />
        ))}
    </div>
  );
});

export default FacilitiesList;
