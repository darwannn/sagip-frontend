type TProps = {
  markerVisibility: {
    assistance: boolean;
    hazard: boolean;
    facility: boolean;
  };
  setMarkerVisibility: React.Dispatch<
    React.SetStateAction<{
      assistance: boolean;
      hazard: boolean;
      facility: boolean;
    }>
  >;
};

const ToggleMarkers = ({ markerVisibility, setMarkerVisibility }: TProps) => {
  return (
    <div className="w-full flex gap-3 mt-3 overflow-x-auto overflow-hidden">
      <label
        htmlFor="assistanceRequestCheckbox"
        className={`px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          markerVisibility.assistance
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Assistance Requests
      </label>
      <input
        className="hidden"
        id="assistanceRequestCheckbox"
        type="checkbox"
        checked={markerVisibility.assistance}
        onChange={() =>
          setMarkerVisibility({
            ...markerVisibility,
            assistance: !markerVisibility.assistance,
          })
        }
      />

      <label
        htmlFor="hazardReportCheckbox"
        className={` px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          markerVisibility.hazard
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Hazard Reports
      </label>
      <input
        className="hidden"
        id="hazardReportCheckbox"
        type="checkbox"
        checked={markerVisibility.hazard}
        onChange={() =>
          setMarkerVisibility({
            ...markerVisibility,
            hazard: !markerVisibility.hazard,
          })
        }
      />

      <label
        htmlFor="facilityCheckbox"
        className={`px-4 py-1 rounded-3xl shadow-md cursor-pointer whitespace-nowrap ${
          markerVisibility.facility
            ? "bg-primary-500 text-white"
            : "bg-white text-black"
        }`}
      >
        <input
          className="hidden"
          id="facilityCheckbox"
          type="checkbox"
          checked={markerVisibility.facility}
          onChange={() =>
            setMarkerVisibility({
              ...markerVisibility,
              facility: !markerVisibility.facility,
            })
          }
        />
        Facilities
      </label>
    </div>
  );
};

export default ToggleMarkers;
