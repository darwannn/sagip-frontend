import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setSelectedHazardCategory,
  setSelectedHazardReport,
} from "../../../../store/slices/hazardReportSlice";
import {
  setTempMarkerPos,
  setAddMode,
} from "../../../../store/slices/facilitySlice";

const HazardCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (category: string) => {
    navigate("/hazard-reports/create");
    dispatch(setSelectedHazardCategory(category));
    dispatch(setSelectedHazardReport(null));
    dispatch(setAddMode(false));
    dispatch(setTempMarkerPos(null));
  };

  return (
    <div className="px-5 pb-5">
      <div className="text-xl font-semibold"> Submit a report:</div>
      {["Object on the street", "Flooded road", "Damaged road", "Others"].map(
        (category) => (
          <button
            key={category}
            className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg my-2"
            onClick={() => handleButtonClick(category)}
          >
            {category}
            {category === "Object on the street" && (
              <span className="text-gray-400"> i.e. Fallen Tree</span>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default HazardCategories;
