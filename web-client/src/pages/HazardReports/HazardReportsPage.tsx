import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";
import HazardMap from "./components/HazardMap";
import { THazardReport } from "./types/hazardReport";
import moment from "moment";

const HazardReportsPage = () => {
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isSuccess: isReportsSuccess,
    isError: isReportsError,
    error,
  } = useGetHazardReportsQuery(undefined);

  if (isReportsLoading) console.log("Loading...");
  if (isReportsError) console.log(error);
  if (isReportsSuccess) console.log(reportsData);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col gap-2 p-2 w-max items-start">
        <h1>Hazard Reports Page</h1>
        <div className="flex flex-col gap-2 bg-gray-50 p-3 shadow-md rounded-md">
          {isReportsLoading ? (
            <p className="text-center">Loading Reports</p>
          ) : (
            reportsData?.map((report: THazardReport) => (
              <div key={report._id} className="border rounded p-2">
                <span>{report._id}</span>
                <br />
                <span>
                  {moment(report.updatedAt).format("MMM DD, YYYY - ddd")}
                </span>
                <span>{moment(report.updatedAt).format("HH:mm")}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <HazardMap />
    </div>
  );
};

export default HazardReportsPage;
