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
    dispatch(setSelectedHazardReport(report));
  };
  return (
    <div className="hover:bg-gray-200 cursor-pointer" onClick={clickHandler}>
      <div key={report._id} className="border rounded p-2 flex flex-col">
        <span className="text-sm text-gray-400">{report._id}</span>
        <span className="text-xl font-bold">{report.category}</span>
        <span>{report.street}</span>
        <div className="text-sm">
          <span>Reported on:</span>
          <br />
          <span>
            {moment(report.updatedAt).format("MMM DD, YYYY - ddd") + " "}
          </span>
          <span>{moment(report.updatedAt).format("HH:mm")}</span>
        </div>
      </div>
    </div>
  );
};

export default HazardReportItem;
