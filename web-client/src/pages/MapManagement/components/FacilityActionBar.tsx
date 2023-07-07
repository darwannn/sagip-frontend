import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectAddMode,
  selectionFacility,
  setAddMode,
} from "../../../store/slices/facilitySlice";
const FacilityActions = () => {
  const dispatch = useAppDispatch();
  const addMode = useAppSelector(selectAddMode);
  const selectedFacility = useAppSelector(selectionFacility);

  return (
    <div className="flex flex-row bg-white p-2 rounded-md shadow-md">
      {/* Add Facility Button */}
      <button
        className={`${
          addMode
            ? "bg-red-200 hover:bg-red-300"
            : "bg-gray-100 hover:bg-gray-300"
        } text-gray-500 p-2 text-2xl rounded-md transition-all duration-200 disabled:text-gray-200 disabled:hover:bg-gray-100`}
        onClick={() => {
          dispatch(setAddMode(!addMode));
        }}
        disabled={selectedFacility !== null}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default FacilityActions;
