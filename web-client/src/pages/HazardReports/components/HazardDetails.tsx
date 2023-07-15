import type { THazardReport } from "../types/hazardReport";

type TProps = {
  reportData: THazardReport;
};

const HazardDetails = ({ reportData }: TProps) => {
  console.log(reportData);
  return (
    <div className="bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%]">
      <h1>Hazard Details</h1>
      {/* USER INFO */}
      {/* REPORT INFO */}
      {/* REPORT ACTION */}
    </div>
  );
};

export default HazardDetails;
