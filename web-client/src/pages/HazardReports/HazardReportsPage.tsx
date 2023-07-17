import { MarkerF } from "@react-google-maps/api";
import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";
import HazardMap from "./components/HazardMap";
import HazardReportsList from "./components/HazardReportsList";
import HazardDetails from "./components/HazardDetails";
import { useAppSelector } from "../../store/hooks";
import { selectHazardReport } from "../../store/slices/hazardReportSlice";
import { useState } from "react";

const HazardReportsPage = () => {
  // Hooks
  const [selectedFilter, setSelectedFilter] = useState("All"); // ["All", "Review", "Ongoing", "Resolved"]
  // Redux
  const selectedReport = useAppSelector(selectHazardReport);
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isError: isReportsError,
    error,
  } = useGetHazardReportsQuery(undefined);

  const filteredReports = reportsData?.filter((report) => {
    if (selectedFilter === "All") return true;
    else if (selectedFilter === "Review") return report.status === "unverified";
    else if (selectedFilter === "Ongoing") return report.status === "ongoing";
    else if (selectedFilter === "Resolved") return report.status === "resolved";
    else return false;
  });

  if (isReportsLoading) console.log("Loading...");
  if (isReportsError) console.log(error);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col gap-2 w-max items-start">
        <h1>Hazard Reports Page</h1>
        <div className="flex flex-col gap-2 bg-gray-50 p-3 shadow-md rounded-md">
          <div className="flex flex-row w-full overflow-x-auto gap-2">
            <button
              className="p-2 bg-gray-200 rounded-md"
              onClick={() => setSelectedFilter("All")}
            >
              All
            </button>
            <button
              className="p-2 bg-gray-200 rounded-md"
              onClick={() => setSelectedFilter("Review")}
            >
              Review
            </button>
            <button
              className="p-2 bg-gray-200 rounded-md"
              onClick={() => setSelectedFilter("Ongoing")}
            >
              Ongoing
            </button>
            <button
              className="p-2 bg-gray-200 rounded-md"
              onClick={() => setSelectedFilter("Resolved")}
            >
              Resolved
            </button>
          </div>
          {isReportsLoading ? (
            <p className="text-center">Loading Reports</p>
          ) : (
            <HazardReportsList reportsData={filteredReports || []} />
          )}
        </div>
      </div>
      {selectedReport && <HazardDetails reportData={selectedReport} />}
      <HazardMap>
        {/* Child components, such as markers, info windows, etc. */}
        {!isReportsLoading &&
          filteredReports?.map((report) => (
            <MarkerF
              key={report._id}
              position={{
                lat: report.latitude,
                lng: report.longitude,
              }}
            />
          ))}
      </HazardMap>
    </div>
  );
};

export default HazardReportsPage;
