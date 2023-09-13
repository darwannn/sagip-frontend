import { useGetOngoingHazardQuery } from "../../../services/hazardReportsQuery";
/* import { useGetUserByTokenQuery } from "../../../../services/accountQuery"; */
import HazardList from "./components/HazardList";
import SubmitButton from "./components/SubmitButton";

const HazardFeed = () => {
  /* const { data: userData } = useGetUserByTokenQuery(); */

  const {
    data: hazard,
    isError: hazardIsError,
    isLoading: hazardIsLoading,
  } = useGetOngoingHazardQuery();

  /* const userStreet = userData?.street;
  const filteredHazardReports = hazard?.filter((report) => {
    return report.street === userStreet;
  }); */

  if (hazardIsLoading) return <div>Loading...</div>;
  if (hazardIsError) console.log("Error");
  return (
    <>
      <div className="bg-gray-100 relative h-screen">
        <div className="flex flex-col p-5 ">
          <div className="font-bold text-xl text-primary-600  mb-2">
            Hazards in your area:
          </div>
          {/* <div className="">Location: {userData?.barangay}</div> */}
          <SubmitButton />
          {hazard /* && filteredHazardReports */ && (
            <HazardList hazard={hazard} />
          )}
        </div>
      </div>
    </>
  );
};

export default HazardFeed;
