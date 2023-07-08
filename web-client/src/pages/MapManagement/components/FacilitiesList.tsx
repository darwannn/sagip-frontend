import { memo, useState } from "react";
import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";

type TProps = {
  facilities: TFacility[];
};

const FacilitiesList = memo(({ facilities }: TProps) => {
  const [search, setSearch] = useState("");

  const filterdFacilities = () => {
    if (search === "") return facilities;
    return facilities.filter((facility) =>
      facility.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col p-3 gap-3 max-h-[700px] w-[350px] overflow-y-auto bg-gray-50 shadow-md rounded-md">
      <div>
        <input
          type="text"
          placeholder="Search Facility"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* <div className="flex flex-row gap-1">
        <select className="w-full p-2 border border-gray-300 rounded-md multiple">
          <option value="all">All</option>
          <option value="hospital">Hospital</option>
          <option value="clinic">Clinic</option>
          <option value="pharmacy">Pharmacy</option>
        </select>
      </div> */}
      {facilities.length != 0 &&
        filterdFacilities().map((facility) => (
          <FacilityItem key={facility._id} facility={facility} />
        ))}
    </div>
  );
});

export default FacilitiesList;
