import moment from "moment";
import { THazardReport } from "../types/hazardReport";

type TProps = {
  reportsData: THazardReport[];
};

const HazardReportsList = ({ reportsData }: TProps) => {
  return (
    <>
      {reportsData.length !== 0 ? (
        reportsData?.map((report: THazardReport) => (
          <div key={report._id} className="border rounded p-2">
            <span>{report._id}</span>
            <br />
            <span>{moment(report.updatedAt).format("MMM DD, YYYY - ddd")}</span>
            <span>{moment(report.updatedAt).format("HH:mm")}</span>
          </div>
        ))
      ) : (
        <p className="text-center">No Reports</p>
      )}
    </>
  );
};

export default HazardReportsList;
