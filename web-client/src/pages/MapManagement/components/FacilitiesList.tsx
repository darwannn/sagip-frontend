import { memo, useState } from "react";
import type { TFacility } from "../types/emergencyFacility";
import FacilityItem from "./FacilityItem";
import Select, { MultiValue } from "react-select";

type TProps = {
  facilities: TFacility[];
};

const FacilitiesList = memo(({ facilities }: TProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const filterdFacilities = () => {
    let filteredFacilities = facilities.filter((facility) =>
      facility.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory.length > 0) {
      filteredFacilities = filteredFacilities.filter((facility) =>
        selectedCategory.includes(facility.category.toLowerCase())
      );
    }

    return filteredFacilities;
  };

  const onSelectChange = (
    data: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setSelectedCategory(data.map((d) => d.value));
  };

  return (
    <div className="flex flex-col p-3 gap-3 max-h-[700px] w-[350px] overflow-y-auto bg-gray-50 shadow-md rounded-md">
      <div>
        <input
          type="text"
          placeholder="Search Facility"
          className="w-full p-2 my-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by Category"
          options={options}
          onChange={onSelectChange}
          isMulti={true}
        />
      </div>
      {facilities.length != 0 &&
        filterdFacilities().map((facility) => (
          <FacilityItem key={facility._id} facility={facility} />
        ))}
    </div>
  );
});

export default FacilitiesList;

const options = [
  { value: "police station", label: "Police Station" },
  { value: "hospital", label: "Hospital" },
  { value: "fire station", label: "Fire Station" },
  { value: "evacuation center", label: "Evacuation Center" },
];
