import moment from "moment";
import { THazardReport } from "../types/hazardReport";

type TProps = {
  report: THazardReport;
};

const HazardReportItem = ({ report }: TProps) => {
  return (
    <div>
      <div key={report._id} className="border rounded p-2">
        <span>{report._id}</span>
        <br />
        <span>{moment(report.updatedAt).format("MMM DD, YYYY - ddd")}</span>
        <span>{moment(report.updatedAt).format("HH:mm")}</span>
      </div>
    </div>
  );
};

export default HazardReportItem;
