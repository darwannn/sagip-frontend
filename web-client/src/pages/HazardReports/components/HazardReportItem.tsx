import moment from "moment";
import { setSelectedHazardReport } from "../../../store/slices/hazardReportSlice";
import { useAppDispatch } from "../../../store/hooks";
import type { THazardReport } from "../types/hazardReport";

type TProps = {
  report: THazardReport;
};

const HazardReportItem = ({ report }: TProps) => {
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(setSelectedHazardReport(report._id));
  };
  return (
    <div className="hover:bg-gray-300 cursor-pointer" onClick={clickHandler}>
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
