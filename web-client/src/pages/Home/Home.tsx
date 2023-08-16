import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

// Services
import { useGetUsersDataQuery } from "../../services/usersApi";
import { useGetArticlesQuery } from "../../services/articleQuery";
import { useGetTeamsQuery } from "../../services/teamQuery";
import { useGetFacilitiesQuery } from "../../services/facilityQuery";
import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";

import {
  setUsers,
  selectNumberOfUsers,
  selectNumberOfNewUsers,
  selectNumberOfActiveUsers,
  selectVerifiedUsers,
  selectNumberOfStaff,
} from "../../store/slices/userManageSlice";

import { selectNumberOfPublishedArticles } from "../../store/slices/articleSlice";

// Icons
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserPlus, FaAmbulance, FaUserCheck } from "react-icons/fa";
import { setArticles } from "../../store/slices/articleSlice";
import { MdLocationOn, MdGroups2 } from "react-icons/md";
import { RiFileUploadFill } from "react-icons/ri";

/* statistics component */
import SingleData from "../../components/Statistics/SingleData";
import MultipleData from "../../components/Statistics/MultipleData";

import Chart from "./RespondsChart";

const Home = () => {
  const dispatch = useAppDispatch();
  const totalUsersCount = useAppSelector(selectNumberOfUsers);
  const newUsersCount = useAppSelector(selectNumberOfNewUsers);
  const activeUsersCount = useAppSelector(selectNumberOfActiveUsers);
  const staffCount = useAppSelector(selectNumberOfStaff);
  const publishedArticlesCount = useAppSelector(
    selectNumberOfPublishedArticles
  );
  const { verifiedCount, unverifiedCount } =
    useAppSelector(selectVerifiedUsers);

  const {
    data: users,
    isLoading: userLoading,
    error: userError,
  } = useGetUsersDataQuery(undefined);
  const {
    data: articles,
    isLoading: articleLoading,
    error: articleError,
  } = useGetArticlesQuery(undefined);
  const {
    data: teams,
    isLoading: teamLoading,
    error: teamError,
  } = useGetTeamsQuery(undefined);
  const {
    data: facilities,
    isLoading: facilityLoading,
    error: facilityError,
  } = useGetFacilitiesQuery(undefined);
  const {
    data: emergencyData,
    isLoading: hazardReportLoading,
    error: hazardReportError,
  } = useGetHazardReportsQuery(undefined);

  // Store data to redux on page load
  useEffect(() => {
    if (users) dispatch(setUsers(users));
    if (articles) dispatch(setArticles(articles));
  }, [users, articles, teams, dispatch]);

  const totalResponseCount =
    teams?.reduce((acc, team) => acc + team.response, 0) || 0;
  const totalFacilitiesCount = facilities?.length;

  if (
    userError ||
    articleError ||
    teamError ||
    facilityError ||
    hazardReportError
  )
    return <div>Something went wrong</div>;

  return (
    <>
      {!(
        userLoading ||
        articleLoading ||
        teamLoading ||
        facilityLoading ||
        hazardReportLoading
      ) ? (
        <div className="flex flex-col justify-center min-h-full bg-gray-50 px-20 py-10 ">
          <div className="text-3xl font-bold mb-3 text-indigo-500">
            Dashboard
          </div>
          <div className="h-full grid grid-row gap-4 xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:sm:grid-cols-4">
            {/* top */}
            <div className=" xl:col-span-1  md:order-first">
              <SingleData
                title="Total Users"
                value={totalUsersCount}
                icon={<BsFillPersonFill />}
                isPrimary={true}
                isThisMonth={false}
                navigateTo="users"
              />
            </div>
            <div className="xl:col-span-1  md:order-first">
              <SingleData
                title="New Users"
                value={newUsersCount}
                icon={<FaUserPlus />}
                isPrimary={false}
                isThisMonth={true}
                navigateTo="users"
              />
            </div>
            <div className="xl:col-span-2 sm:col-span-2 ">
              <MultipleData
                data={[
                  {
                    title: "Verified Users",
                    value: verifiedCount,
                    color: "rgba(99, 102, 241,1)",
                  },
                  {
                    title: "Unverified Users",
                    value: unverifiedCount,
                    color: "rgba(212, 85, 85, 1)",
                  },
                ]}
                navigateTo="users"
              />
            </div>
            <div className="xl:col-span-1 md:order-first lg:order-none">
              <SingleData
                title="Active Users"
                value={activeUsersCount}
                icon={<FaUserCheck />}
                isPrimary={false}
                isThisMonth={true}
                navigateTo="users"
              />
            </div>

            {/* chart */}
            <div className=" rounded-xl p-5 bg-gray-200 row-span-2 xl:col-span-3 order-last sm:col-span-2 md:col-span-3 lg:col-span-4 xl:order-none h-96">
              <Chart emergencyData={emergencyData} />
            </div>

            {/* side */}
            <div className=" xl:col-span-1">
              <SingleData
                title="Total Response"
                value={totalResponseCount}
                icon={<FaAmbulance />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="emergency-reports"
              />
            </div>
            <div className=" xl:col-span-1">
              <SingleData
                title="Published Articles"
                value={publishedArticlesCount}
                icon={<RiFileUploadFill />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="articles"
              />
            </div>
            <div className=" xl:col-span-1">
              <SingleData
                title="Responders"
                value={staffCount.responderCount}
                icon={<MdGroups2 />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="teams"
              />
            </div>
            <div className=" xl:col-span-1">
              <SingleData
                title="Markers Places"
                value={totalFacilitiesCount}
                icon={<MdLocationOn />}
                isPrimary={false}
                isThisMonth={false}
                navigateTo="facility-map"
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

export default Home;
