import HazardItem from "./HazardItem";

import type { THazardReport } from "../../../../types/hazardReport";

type TProps = {
  hazard: THazardReport[];
};

const HazardList = ({ hazard }: TProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        {hazard.length != 0 ? (
          hazard.map((article, index) => (
            <HazardItem key={index} hazard={article} />
          ))
        ) : (
          <p className="text-center">No Results</p>
        )}
      </div>
    </>
  );
};

export default HazardList;
