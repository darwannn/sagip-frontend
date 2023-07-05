import type { TFacility } from "../types/emergencyFacility";

type TProps = {
  facility: TFacility;
  selectFacilityHandler: (facility: TFacility) => void;
  onDeleteFacilityHandler: (facilityId: string) => void;
};

const FacilityItem = ({
  facility,
  selectFacilityHandler,
  onDeleteFacilityHandler,
}: TProps) => {
  return (
    <div
      className="border p-1 hover:bg-gray-200 cursor-pointer"
      onClick={() => {
        selectFacilityHandler(facility);
      }}
    >
      <p>{facility.name}</p>
      <p>{facility.contactNumber}</p>
      <p>{facility.latitude}</p>
      <p>{facility.longitude}</p>
      <button
        type="button"
        className="bg-red-500 p-1"
        onClick={() => onDeleteFacilityHandler(facility._id || "")}
      >
        Delete
      </button>
    </div>
  );
};

export default FacilityItem;
