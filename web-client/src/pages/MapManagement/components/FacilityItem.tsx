import type { TFacility } from "../types/emergencyFacility";
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedFacility } from "../../../store/slices/facilitySlice";
import { useDeleteFacilityMutation } from "../../../services/facilityQuery";
type TProps = {
  facility: TFacility;
};

const FacilityItem = ({ facility }: TProps) => {
  const dispatch = useAppDispatch();
  const [deleteFacility, deleteFacilityState] = useDeleteFacilityMutation();

  const onSelectFacilityHandler = () => {
    dispatch(setSelectedFacility(facility));
  };

  const onDeleteFacilityHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to delete " + facility.name + "?"
    );
    if (!confirm) return;
    deleteFacility({ id: facility._id });
  };

  return (
    <div
      className="border p-1 hover:bg-gray-200 cursor-pointer"
      onClick={onSelectFacilityHandler}
    >
      <p className="text-gray-400">{facility._id}</p>
      <p>{facility.name}</p>
      <p>{facility.contactNumber}</p>
      <button
        type="button"
        className="bg-red-500 p-1 disabled:bg-red-300 disabled:cursor-not-allowed"
        onClick={onDeleteFacilityHandler}
        disabled={deleteFacilityState.isLoading}
      >
        {deleteFacilityState.isLoading ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default FacilityItem;
