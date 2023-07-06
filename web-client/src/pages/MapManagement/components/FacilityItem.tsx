import type { TFacility } from "../types/emergencyFacility";
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedFacility } from "../../../store/slices/facilitySlice";
type TProps = {
  facility: TFacility;
  onDeleteFacilityHandler: (facilityId: string) => void;
};

const FacilityItem = ({ facility, onDeleteFacilityHandler }: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="border p-1 hover:bg-gray-200 cursor-pointer"
      onClick={() => {
        dispatch(setSelectedFacility(facility));
      }}
    >
      <p className="text-gray-400">{facility._id}</p>
      <p>{facility.name}</p>
      <p>{facility.contactNumber}</p>
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
