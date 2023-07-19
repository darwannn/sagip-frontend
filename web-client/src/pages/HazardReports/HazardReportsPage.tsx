import { MarkerF } from "@react-google-maps/api";
import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";
import HazardMap from "./components/HazardMap";
import HazardReportsList from "./components/HazardReportsList";
import HazardDetails from "./components/HazardDetails";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectHazardReport,
  setSelectedHazardReport,
} from "../../store/slices/hazardReportSlice";
import { useCallback, useState } from "react";
import { THazardReport } from "./types/hazardReport";
import HazardFilters from "./components/HazardFilters";

const HazardReportsPage = () => {
  // Map State / Instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // Hooks
  const [selectedFilter, setSelectedFilter] = useState("Review"); // ["All", "Review", "Ongoing", "Resolved"]
  // Redux
  const dispatch = useAppDispatch();
  const selectedReport = useAppSelector(selectHazardReport);
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isError: isReportsError,
    error,
  } = useGetHazardReportsQuery(undefined);

  // Set map state
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const changeFilter = (filter: string) => {
    if (selectedReport) dispatch(setSelectedHazardReport(null));
    setSelectedFilter(filter);
  };

  const filteredReports = reportsData?.filter((report: THazardReport) => {
    if (selectedFilter === "All") return true;
    else if (selectedFilter === "Review") return report.status === "unverified";
    else if (selectedFilter === "Ongoing") return report.status === "ongoing";
    else if (selectedFilter === "Resolved") return report.status === "resolved";
    else return false;
  });

  // Pan map on selected report
  if (selectedReport) {
    map?.panTo({
      lat: selectedReport.latitude,
      lng: selectedReport.longitude,
    });
  }

  const onMarkerClick = (report: THazardReport) => {
    map?.panTo({
      lat: report.latitude,
      lng: report.longitude,
    });
    dispatch(setSelectedHazardReport(report));
  };

  if (isReportsLoading) console.log("Loading...");
  if (isReportsError) console.log(error);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col gap-2 w-max items-start">
        <div className="flex flex-col gap-2 bg-gray-50 p-3 shadow-md rounded-md">
          <HazardFilters onChangeFilter={changeFilter} />
          {isReportsLoading ? (
            <p className="text-center">Loading Reports</p>
          ) : (
            <HazardReportsList reportsData={filteredReports || []} />
          )}
        </div>
      </div>
      {selectedReport && <HazardDetails reportData={selectedReport} />}
      <HazardMap onMapLoadHandler={onMapLoad}>
        {/* Child components, such as markers, info windows, etc. */}
        {!isReportsLoading &&
          filteredReports?.map((report) => (
            <MarkerF
              key={report._id}
              position={{
                lat: report.latitude,
                lng: report.longitude,
              }}
              onClick={() => onMarkerClick(report)}
            />
          ))}
      </HazardMap>
    </div>
  );
};

export default HazardReportsPage;
