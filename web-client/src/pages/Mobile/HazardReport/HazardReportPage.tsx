import { useState, useMemo } from "react";

import {
  useGetOngoingHazardQuery,
  useGetMyHazardReportQuery,
} from "../../../services/hazardReportsQuery";
import { useGetUserByTokenQuery } from "../../../services/accountQuery";

import HazardList from "./components/HazardList";
import SubmitAReportButton from "./components/SubmitAReportButton";

const HazardReportPage = () => {
  const token = localStorage.getItem("token");
  const { data: userData } = useGetUserByTokenQuery();
  const categories = ["All", `Within ${userData?.barangay}`, "My Report"];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const {
    data: hazardData,
    isError: hazardIsError,
    isLoading: hazardIsLoading,
  } = useGetOngoingHazardQuery();
  const {
    data: myReportData,
    isError: myHazardIsError,
    isLoading: myHazardIsLoading,
  } = useGetMyHazardReportQuery();

  const filteredHazardData = useMemo(() => {
    if (hazardData && selectedCategory === "All") {
      return hazardData;
    } else if (
      hazardData &&
      selectedCategory === `Within ${userData?.street}`
    ) {
      return hazardData.filter(
        (hazard) => userData?.street?.includes(hazard.street)
      );
    } else if (hazardData && selectedCategory === "My Report") {
      return hazardData.filter((hazard) => {
        const isMyReport = hazard.userId._id === userData?._id;
        return isMyReport;
      });
    } else {
      return [];
    }
  }, [hazardData, selectedCategory, userData]);

  if (hazardIsLoading || myHazardIsLoading) return <div>Loading...</div>;
  if (hazardIsError || myHazardIsError) console.log("Error");

  return (
    <>
      <div className="bg-gray-100 relative h-screen pb-20">
        <div className="flex flex-col p-5 gap-5">
          <div className="font-bold text-xl text-primary-600  mb-2">
            Hazards in your area:
          </div>

          {token && <SubmitAReportButton />}

          {/* unverified hazard report */}
          <div>
            {myReportData && myReportData.length > 0 && (
              <>
                <div className="mb-2">
                  Your pending{" "}
                  {myReportData && myReportData.length > 1
                    ? "reports"
                    : "report"}
                  :
                </div>
                <HazardList hazardData={myReportData} isMyReport={true} />
              </>
            )}
          </div>
          {/* filters hazard feed */}
          {/* <hr /> */}
          <div className="flex">
            <select
              className="outline-0 border rounded-md p-1"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* hazard feed */}
          {filteredHazardData && (
            <HazardList hazardData={filteredHazardData} isMyReport={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default HazardReportPage;
