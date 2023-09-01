import { memo } from "react";
// Services / API
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedFacility } from "../../../../store/slices/facilitySlice";
import { useDeleteFacilityMutation } from "../../../../services/facilityQuery";
// Types
import { TFacility } from "../../../../types/emergencyFacility";
// Icons
import FacilityIcon from "./FacilityIcon";
import { MdLocationOn, MdDelete } from "react-icons/md";
type TProps = {
  facility: TFacility;
};

const FacilityItem = memo(({ facility }: TProps) => {
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
      className="border rounded-md bg-white  cursor-pointer"
      onClick={onSelectFacilityHandler}
    >
      <div className="p-3 hover:bg-gray-200">
        <div className="flex flex-row items-center gap-1">
          <span className="text-l bg-blue-500 text-white p-1 rounded-md">
            <FacilityIcon facilityType={facility.category} />
          </span>
          <span className="text-sm text-gray-500">{facility._id}</span>
        </div>
        <div className="mt-5 flex flex-row">
          <span className="font-semibold text-xl">{facility.name}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-gray-400 text-sm">
            <MdLocationOn />
          </span>
          <span className="text-sm text-gray-500 w-1/2 truncate">
            Lat: {facility.latitude}
          </span>
          <span className="text-sm text-gray-500 w-1/2 truncate">
            Lang: {facility.longitude}
          </span>
        </div>
      </div>
      {/* Item Action */}
      <div className="flex flex-row justify-end p-2 border-t transition-all duration-200">
        <button
          className="bg-gray-200 text-gray-300 hover:text-white hover:bg-red-500 text-[20px] p-1 rounded transition-all duration-200"
          onClick={onDeleteFacilityHandler}
          disabled={deleteFacilityState.isLoading}
        >
          {deleteFacilityState.isLoading ? "Loading..." : <MdDelete />}
        </button>
      </div>
    </div>
  );
});

export default FacilityItem;
