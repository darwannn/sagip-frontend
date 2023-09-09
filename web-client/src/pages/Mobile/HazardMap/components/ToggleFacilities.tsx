type TProps = {
  facilityVisibility: {
    evacuationArea: boolean;
    policeStation: boolean;
    fireStation: boolean;
    hospital: boolean;
  };
  setFacilityVisibility: React.Dispatch<
    React.SetStateAction<{
      evacuationArea: boolean;
      policeStation: boolean;
      fireStation: boolean;
      hospital: boolean;
    }>
  >;
};

const ToggleFacilities = ({
  facilityVisibility,
  setFacilityVisibility,
}: TProps) => {
  return (
    <div className="w-full flex gap-1 mt-3 overflow-x-auto overflow-hidden">
      <label
        htmlFor="evacuationAreaCheckbox"
        className={` px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          facilityVisibility.evacuationArea
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Evacuation Areas
      </label>
      <input
        className="hidden"
        id="evacuationAreaCheckbox"
        type="checkbox"
        checked={facilityVisibility.evacuationArea}
        onChange={() =>
          setFacilityVisibility({
            ...facilityVisibility,
            evacuationArea: !facilityVisibility.evacuationArea,
          })
        }
      />
      <br />
      <label
        htmlFor="policeStationCheckbox"
        className={` px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          facilityVisibility.policeStation
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Police Stations
      </label>
      <input
        className="hidden"
        id="policeStationCheckbox"
        type="checkbox"
        checked={facilityVisibility.policeStation}
        onChange={() =>
          setFacilityVisibility({
            ...facilityVisibility,
            policeStation: !facilityVisibility.policeStation,
          })
        }
      />
      <br />
      <label
        htmlFor="fireStationCheckbox"
        className={` px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          facilityVisibility.fireStation
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Fire Stations
      </label>
      <input
        className="hidden"
        id="fireStationCheckbox"
        type="checkbox"
        checked={facilityVisibility.fireStation}
        onChange={() =>
          setFacilityVisibility({
            ...facilityVisibility,
            fireStation: !facilityVisibility.fireStation,
          })
        }
      />
      <br />
      <label
        htmlFor="hospitalCheckbox"
        className={` px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          facilityVisibility.hospital
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        <input
          className="hidden"
          id="hospitalCheckbox"
          type="checkbox"
          checked={facilityVisibility.hospital}
          onChange={() =>
            setFacilityVisibility({
              ...facilityVisibility,
              hospital: !facilityVisibility.hospital,
            })
          }
        />
        Hospitals
      </label>
    </div>
  );
};

export default ToggleFacilities;
