import { useState } from "react";
import { BiUpload } from "react-icons/bi";

import BottomSheet from "../../../../components/BottomSheet/BottomSheet";
import HazardCategories from "./HazardCategories";

const SubmitButton = () => {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  return (
    <>
      <button
        className="flex items-center gap-2 bg-gray-200 text-gray-600 px-5 py-3 rounded-xl "
        onClick={() => setShowBottomSheet(true)}
      >
        <BiUpload className="text-xl" />
        Submit a Report
      </button>
      <BottomSheet
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        snapPoints={[1000]}
        headerStyle="bg-white rounded-t-3xl"
        contentStyle="bg-white"
        component={
          <>
            <HazardCategories />
          </>
        }
        isBackdropShown={true}
      />
    </>
  );
};

export default SubmitButton;
