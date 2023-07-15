import { memo } from "react";
import { THazardReport } from "../types/hazardReport";
import HazardReportItem from "./HazardReportItem";

type TProps = {
  reportsData: THazardReport[];
};

const HazardReportsList = memo(({ reportsData }: TProps) => {
  return (
    <>
      {reportsData.length !== 0 ? (
        reportsData?.map((report: THazardReport) => (
          <HazardReportItem key={report._id} report={report} />
        ))
      ) : (
        <p className="text-center">No Reports</p>
      )}
    </>
  );
});

export default HazardReportsList;
