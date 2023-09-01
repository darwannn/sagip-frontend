// Services
import { useGetStatisticsQuery } from "../../../services/accountQuery";

// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserPlus, FaAmbulance } from "react-icons/fa";

import { RiFileWarningFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { RiFileUploadFill } from "react-icons/ri";
import { MdEmojiPeople } from "react-icons/md";
/* statistics component */
import SingleData from "../../../components/Statistics/SingleData";
import MultipleData from "../../../components/Statistics/MultipleData";

import RespondsChart from "./components/RespondsChart";

const Dashboard = () => {
  const {
    data: statisticsData,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useGetStatisticsQuery();

  if (statisticsError) return <div>Something went wrong</div>;

  return (
    <>
      {!statisticsLoading ? (
        <div className="flex flex-col justify-center min-h-full bg-gray-50 px-20 py-10 ">
          <div className="text-3xl font-bold mb-3 text-indigo-500">
            Dashboard
          </div>
          <div className="h-full grid grid-row gap-4 xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:sm:grid-cols-4">
            {/* top */}
            <div className=" xl:col-span-1  md:order-first">
              <SingleData
                title="Total Residents"
                value={statisticsData?.residents}
                icon={<BsFillPersonFill />}
                isPrimary={true}
                isThisMonth={false}
                navigateTo="users"
                style="dashboard"
              />
            </div>
            {/* <div className="xl:col-span-1  md:order-first">
              <SingleData
                title="New Assistance Request"
                value={statisticsData?.pendingAssistanceRequests}
                icon={<MdEmojiPeople />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="emergency-reports"
                style="dashboard"
              />
            </div> */}
            <div className="xl:col-span-1  md:order-first">
              <SingleData
                title="New Users"
                value={statisticsData?.usersThisMonth}
                icon={<FaUserPlus />}
                isPrimary={false}
                isThisMonth={true}
                navigateTo="users"
                style="dashboard"
              />
            </div>
            <div className="xl:col-span-2 sm:col-span-2 ">
              <MultipleData
                data={[
                  {
                    title: "Verified Users",
                    value: statisticsData?.verifiedUsers || 0,
                    color: "rgba(99, 102, 241,1)",
                  },
                  {
                    title: "Unverified Users",
                    value: statisticsData?.unverifiedUsers || 0,
                    color: "rgba(212, 85, 85, 1)",
                  },
                ]}
                navigateTo="users"
              />
            </div>

            {/*   <div className="xl:col-span-1  md:order-first">
              <SingleData
                title="New Hazard Report"
                value={statisticsData?.pendingAssistanceRequests}
                icon={<RiFileWarningFill />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="hazard-reports"
                style="dashboard"
              />
            </div> */}
            <div className=" xl:col-span-1">
              <SingleData
                title="Total Response"
                value={statisticsData?.responses}
                icon={<FaAmbulance />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="emergency-reports"
                style="dashboard"
              />
            </div>
            {/* chart */}
            <div className=" rounded-xl p-5 bg-gray-200 row-span-2 xl:col-span-3 order-last sm:col-span-2 md:col-span-3 lg:col-span-4 xl:order-none h-96">
              <RespondsChart
                emergencyData={statisticsData?.assistanceRequests}
              />
            </div>

            {/* side */}

            <div className=" xl:col-span-1 md:order-first lg:order-none ">
              <SingleData
                title="Pending Hazard Report"
                value={statisticsData?.pendingAssistanceRequests}
                icon={<RiFileWarningFill />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="hazard-reports"
                style="dashboard"
              />
            </div>
            <div className="xl:col-span-1 md:order-first lg:order-none">
              <SingleData
                title="Pending Assistance Request"
                value={statisticsData?.pendingAssistanceRequests}
                icon={<MdEmojiPeople />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="emergency-reports"
                style="dashboard"
              />
            </div>
            <div className=" xl:col-span-1">
              <SingleData
                title="Published Articles"
                value={statisticsData?.publishedArticles}
                icon={<RiFileUploadFill />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="articles"
                style="dashboard"
              />
            </div>
            <div className=" xl:col-span-1">
              <SingleData
                title="Marked Facilities"
                value={statisticsData?.emergencyFacilities}
                icon={<MdLocationOn />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="facility-map"
                style="dashboard"
              />
            </div>
          </div>
        </div>
      ) : (
        <div> Loading...</div>
      )}
    </>
  );
};

export default Dashboard;
