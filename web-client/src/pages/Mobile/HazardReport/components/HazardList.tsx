import HazardItem from "./HazardItem";

import type { THazardReport } from "../../../../types/hazardReport";

type TProps = {
  hazardData: THazardReport[];
  isMyReport: boolean;
};

const HazardList = ({ hazardData, isMyReport }: TProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {hazardData.length != 0 ? (
          hazardData.map((hazard, index) => (
            <HazardItem
              key={index}
              hazardData={hazard}
              isMyReport={isMyReport}
            />
          ))
        ) : (
          <p className="text-center">No Results</p>
        )}
      </div>
    </>
  );
};

export default HazardList;
